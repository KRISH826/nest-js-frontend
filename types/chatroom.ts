import { User } from "./user";

export interface chatRoomAvatar {
    public_id: string;
    url: string;
}

export interface ChatRoom {
    _id: string;
    name: string;
    description?: string;
    maxMembers: number;
    active: boolean;
    avatar?: chatRoomAvatar;
    createdBy: string | User;
    members: (string | User)[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateChatRoomRequest {
    name: string;
    description?: string;
    maxMembers: number;
    avatar?: File;
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
    avatar?: File;
}

export interface UpdateChatRoomResponse {
    message: string;
    data: ChatRoom;
}
