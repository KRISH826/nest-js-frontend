import { useSocket } from "@/provider/SocketProvider";
import { Chat, ChatSender } from "@/types/chat";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { appendChatMessageToCache } from "@/lib/api/chat/chatApi";

export interface NewMessagePayload {
    _id?: string;
    senderId?: string;
    chatRoom: string;
    sender: ChatSender;
    message: string;
    tempId?: string;
    edited?: boolean;
    deleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export function useChatSocket(roomId?: string | null) {
    const { isConnected, socket } = useSocket();
    const [liveMessage, setLiveMessage] = useState<Chat[]>([]);
    const dispatch = useAppDispatch();
    const roomIdRef = useRef(roomId);

    // Keep active roomId ref fresh to avoid stale closures in socket callbacks
    useEffect(() => {
        roomIdRef.current = roomId;
    }, [roomId]);

    // Ensure socket auto-connects if disconnected
    useEffect(() => {
        if (socket && !socket.connected) {
            socket.connect();
        }
    }, [socket]);

    // Handle room joining, auto-reconnection re-join, and incoming messages
    useEffect(() => {
        if (!socket || !roomId) return;

        const joinCurrentRoom = () => {
            if (socket.connected && roomId) {
                socket.emit("joinRoom", { roomId });
            }
        };

        // 1. Join active chat room immediately
        joinCurrentRoom();

        // 2. Auto re-join room on WebSocket reconnection after network drops
        const handleReconnect = () => {
            joinCurrentRoom();
        };

        // 3. Handle incoming real-time messages from NestJS backend gateway
        const handleMessage = (payload: NewMessagePayload) => {
            const currentRoom = roomIdRef.current;
            if (!payload || payload.chatRoom !== currentRoom) return;

            const formattedMessage: Chat = {
                _id: payload._id || payload.tempId || payload.senderId || `msg_${Date.now()}`,
                chatRoom: payload.chatRoom,
                sender: payload.sender,
                message: payload.message,
                tempId: payload.tempId,
                edited: payload.edited ?? false,
                deleted: payload.deleted ?? false,
                createdAt: payload.createdAt || new Date().toISOString(),
                updatedAt: payload.updatedAt || payload.createdAt || new Date().toISOString(),
            };

            // WhatsApp-level Deduplication & Reconciliation:
            // If message with tempId or _id exists, replace/reconcile; otherwise append.
            setLiveMessage((prev) => {
                const existingIndex = prev.findIndex(
                    (m) =>
                        (payload.tempId && m.tempId === payload.tempId) ||
                        (formattedMessage._id && m._id === formattedMessage._id)
                );

                if (existingIndex !== -1) {
                    const updated = [...prev];
                    updated[existingIndex] = formattedMessage;
                    return updated;
                }

                return [...prev, formattedMessage];
            });

            // Sync message directly into RTK Query cache
            appendChatMessageToCache(dispatch, currentRoom, formattedMessage);
        };

        socket.on("connect", handleReconnect);
        socket.on("newMessage", handleMessage);

        return () => {
            if (socket.connected) {
                socket.emit("leaveRoom", { roomId });
            }
            socket.off("connect", handleReconnect);
            socket.off("newMessage", handleMessage);
        };
    }, [socket, roomId, dispatch]);

    // Reset live messages state when changing active rooms (during render to avoid cascading renders)
    const [prevRoomId, setPrevRoomId] = useState(roomId);
    if (prevRoomId !== roomId) {
        setPrevRoomId(roomId);
        setLiveMessage([]);
    }

    const emitLeave = useCallback(() => {
        if (socket && socket.connected && roomId) {
            socket.emit("leaveRoom", { roomId });
        }
    }, [socket, roomId]);

    const sendMessage = useCallback(
        (content: string) => {
            const trimmed = content.trim();
            if (!socket || !socket.connected || !roomId || !trimmed) return;

            const tempId = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

            socket.emit(
                "chatMessage",
                {
                    chatRoom: roomId,
                    message: trimmed,
                    tempId,
                },
                (response?: { status: string; chatData?: Chat; message?: string }) => {
                    if (response?.status === "success" && response.chatData) {
                        const verified = response.chatData;
                        setLiveMessage((prev) =>
                            prev.map((m) => (m.tempId === tempId ? verified : m))
                        );
                        appendChatMessageToCache(dispatch, roomId, verified);
                    }
                }
            );
        },
        [socket, roomId, dispatch]
    );

    return {
        liveMessage,
        SetliveMessage: setLiveMessage,
        setLiveMessage,
        sendMessage,
        emitLeave,
        isConnected,
    };
}

export const useChatMessage = useChatSocket;
export default useChatSocket;