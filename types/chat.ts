import { User } from "./user";
import { ChatRoom } from "./chatroom";

/**
 * Chat Entity matching NestJS Mongoose Schema
 */
export interface Chat {
  _id: string;
  chatRoom: string | ChatRoom;
  sender: string | User;
  message: string;
  edited: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Chat API DTOs
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

export interface GetChatsResponse {
  message: string;
  data: Chat[];
}

/**
 * UI & WebSockets Display Helper Types
 */
export type SenderType = "user" | "other" | "system" | "ai";

export interface Message {
  id: string;
  content: string;
  sender: string;
  senderType: SenderType;
  timestamp: string;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: number;
}

export interface Responder {
  name: string;
  type: SenderType;
  avatar: string;
  templates: string[];
}