// src/lib/socket/ws.ts
import { io, Socket } from "socket.io-client";

const WS_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const socket: Socket = io(WS_URL, {
    autoConnect: false,
    withCredentials: true, // Crucial for sending HttpOnly access_token cookie over WS
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
});