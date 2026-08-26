import { useSocket } from "@/provider/SocketProvider";
import { Chat, ChatSender } from "@/types/chat";
import { useCallback, useEffect, useState } from "react";

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
    const [liveMessage, SetliveMessage] = useState<Chat[]>([]);

    useEffect(() => {
        if (!isConnected || !socket || !roomId) return;

        socket.emit("joinRoom", { roomId });

        const handleMessage = (payload: NewMessagePayload) => {
            if (payload.chatRoom === roomId) {
                const formattedMessage: Chat = {
                    _id: payload._id || payload.senderId || payload.tempId || '',
                    chatRoom: payload.chatRoom,
                    sender: payload.sender,
                    message: payload.message,
                    tempId: payload.tempId,
                    edited: payload.edited ?? false,
                    deleted: payload.deleted ?? false,
                    createdAt: payload.createdAt || new Date().toISOString(),
                    updatedAt: payload.updatedAt || payload.createdAt || new Date().toISOString(),
                };
                SetliveMessage((prev) => [...prev, formattedMessage]);
            }
        };

        socket.on("newMessage", handleMessage);

        return () => {
            socket.emit("leaveRoom", { roomId });
            socket.off("newMessage", handleMessage);
        };
    }, [isConnected, roomId, socket]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        SetliveMessage([]);
    }, [roomId]);

    const sendMessage = useCallback(
        (content: string) => {
            if (!socket || !isConnected || !roomId || !content.trim()) return;
            const tempId = `temp_${Date.now()}`;
            socket.emit("chatMessage", {
                chatRoom: roomId,
                message: content,
                tempId,
            });
        },
        [socket, isConnected, roomId]
    );

    return {
        liveMessage,
        SetliveMessage,
        sendMessage,
        isConnected,
    };
}