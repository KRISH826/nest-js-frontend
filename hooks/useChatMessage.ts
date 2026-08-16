import { useEffect, useState, useCallback } from "react";
import { socket } from "@/lib/socket/ws";
import { Message, ChatMessage } from "@/types/chat";

function formatTimestamp(ts: number): string {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function toDisplayMessage(raw: ChatMessage, currentUsername?: string): Message {
    const isSystem = raw.username === "system"
    const isUser = raw.username === currentUsername

    return {
        id: raw.id,
        content: raw.message,
        sender: raw.username,
        senderType: isSystem ? "system" : (isUser ? "user" : "other"),
        timestamp: formatTimestamp(raw.timestamp),
    }
}

export function useChatMessages(currentUsername?: string) {
    const [messages, setMessages] = useState<Message[]>([]);

    const handleChatMessage = useCallback(
        (data: ChatMessage) => {
            setMessages((prev) => [...prev, toDisplayMessage(data, currentUsername)])
        },
        [currentUsername]
    )

    const handleMessageList = useCallback((history: ChatMessage[]) => {
        setMessages(
            history.map((m) => toDisplayMessage(m, currentUsername))
        )
    }, [currentUsername])

    const handleRoomNotice = useCallback((data: { username: string, message: string }) => {
        setMessages((prev) => [
            ...prev,
            toDisplayMessage({
                id: crypto.randomUUID(),
                username: "system",
                message: data.message,
                timestamp: Date.now(),
            }, currentUsername)
        ])
    }, [currentUsername])

    useEffect(() => {
        socket.on("chatMessage", handleChatMessage)
        socket.on("messageList", handleMessageList)
        socket.on("roomNotice", handleRoomNotice)

        return () => {
            socket.off("chatMessage", handleChatMessage)
            socket.off("messageList", handleMessageList)
            socket.off("roomNotice", handleRoomNotice)
        }
    }, [handleChatMessage, handleMessageList, handleRoomNotice])

    const sendMessage = (message: string) => {
        const trimmed = message.trim()
        if (!trimmed) return
        socket.emit("chatMessage", {
            username: currentUsername,
            message
        })
    }

    return { messages, setMessages, sendMessage };
}