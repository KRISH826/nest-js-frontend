// src/provider/SocketProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { socket } from "@/lib/socket/ws";
import { Chat } from "@/types/chat";

interface SocketContextType {
    socket: typeof socket;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket,
    isConnected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
            console.log("[WS Connected]:", socket.id);
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log("[WS Disconnected]");
        }

        function onConnectError(err: Error) {
            setIsConnected(false);
            console.log("[WS Connect Error]:", err.message);
        }

        function onRoomNotice(data: { user: string; message: string; timestamp: string }) {
            console.log(`[Room Notice]: ${data.user} - ${data.message}`);
        }

        function onNewMessage(data: Chat) {
            console.log("[New Message Received]:", data);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("connect_error", onConnectError);
        socket.on("roomNotice", onRoomNotice);
        socket.on("newMessage", onNewMessage);

        if (!socket.connected) {
            socket.connect();
        }

        let reconnecting = false;

        function forceReconnectIfNeeded() {
            if (
                document.visibilityState === "visible" &&
                !socket.connected &&
                !reconnecting
            ) {
                reconnecting = true;
                socket.connect();
                setTimeout(() => {
                    reconnecting = false;
                }, 3000);
            }
        }

        document.addEventListener("visibilitychange", forceReconnectIfNeeded);
        window.addEventListener("online", forceReconnectIfNeeded);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("connect_error", onConnectError);
            socket.off("roomNotice", onRoomNotice);
            socket.off("newMessage", onNewMessage);
            document.removeEventListener("visibilitychange", forceReconnectIfNeeded);
            window.removeEventListener("online", forceReconnectIfNeeded);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => useContext(SocketContext);