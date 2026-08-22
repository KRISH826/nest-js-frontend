import { User } from "./user";

export interface ChatRoom {
    _id: string;
    name: string;
    description?: string;
    maxMembers: number;
    active: boolean;
    createdBy: string | User;
    members: (string | User)[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateChatRoomRequest {
    name: string;
    description?: string;
    maxMembers: number;
}

export interface CreateChatRoomResponse {
    message: string;
    data: ChatRoom;
}

export interface GetChatRoomsResponse {
    message: string;
    data: ChatRoom[];
}

export interface GetChatRoomResponse {
    message: string;
    data: ChatRoom;
}

export interface UpdateChatRoomRequest {
    name?: string;
    description?: string;
    maxMembers?: number;
    active?: boolean;
}

export interface UpdateChatRoomResponse {
    message: string;
    data: ChatRoom;
}
