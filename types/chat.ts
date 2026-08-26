import type { User } from "./user";
import type { ChatRoom } from "./chatroom";

export interface Message {
  id: string;
  sender: string;
  senderType: "other" | "ai" | "user";
  avatar: string;
  content: string;
  timestamp: string;
}

export interface Responder {
  name: string;
  type: "other" | "ai" | "user";
  avatar: string;
  templates: string[];
}

/**
 * Sender details populated from Mongoose User document
 */
export interface ChatSender {
  _id: string;
  email: string;
  fname?: string;
  lname?: string;
  avatar?: {
    public_id: string;
    url: string;
  };
}

/**
 * Main Chat Message Entity
 */
export interface Chat {
  _id: string;
  chatRoom: string | ChatRoom;
  sender: ChatSender | string;
  message: string;
  edited: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  tempId?: string; // Used for client-side optimistic UI matching
}

/**
 * HTTP REST Request & Response Types
 */
export interface SendMessageRequest {
  chatRoom: string;
  message: string;
}

export interface EditMessageRequest {
  message: string;
}

export interface ChatResponse {
  message: string;
  data: Chat;
}

export interface GetRoomMessagesArgs {
  chatRoomId: string;
  limit?: number;
  before?: string;
}

export interface GetRoomMessagesResponse {
  message: string;
  data: Chat[];
  before?: string;
  hasMore: boolean;
  limit?: number;
}

/**
 * WebSocket Event Payloads
 */
export interface JoinRoomPayload {
  roomId: string;
}

export interface LeaveRoomPayload {
  roomId: string;
}

export interface WsSendMessagePayload {
  chatRoom: string;
  message: string;
  tempId?: string;
}

export interface RoomNoticePayload {
  user: string;
  message: string;
  timestamp: string;
}

/**
 * UI State & Rendering Helper Types
 */
export type MessageDeliveryStatus = "pending" | "sent" | "error";

export interface OptimisticChatMessage extends Chat {
  status?: MessageDeliveryStatus;
}