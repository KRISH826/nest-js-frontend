// src/types/socket.ts
import { Chat, ChatSender } from './chat';

/** Server -> Client Events (Listen) */
export interface ServerToClientEvents {
    newMessage: (payload: {
        tempId?: string;
        senderId: string;
        sender: ChatSender;
        chatRoom: string;
        message: string;
        createdAt: string;
    }) => void;
    roomNotice: (payload: {
        user: string;
        message: string;
        timestamp: string;
    }) => void;
    error: (payload: {
        message: string;
    }) => void;
}

/** Client -> Server Events (Emit) */
export interface ClientToServerEvents {
    joinRoom: (
        payload: { roomId: string },
        ack?: (response: { status: 'success' | 'error'; message: string }) => void
    ) => void;
    leaveRoom: (
        payload: { roomId: string },
        ack?: (response: { status: 'success' | 'error'; message: string }) => void
    ) => void;
    chatMessage: (
        payload: { chatRoom: string; message: string; tempId?: string },
        ack?: (response: { status: 'success' | 'error'; chatData: Chat }) => void
    ) => void;
}