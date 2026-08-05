export type SenderType = "user" | "other" | "system" | "ai"

export interface Message {
  id: string
  content: string
  sender: string
  senderType: SenderType
  timestamp: string
  avatar?: string
}

export interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: number
}

export interface Responder {
  name: string
  type: SenderType
  avatar: string
  templates: string[]
}

export interface ChatRoom {
  id: string
  name: string
  type: "channel" | "dm"
  avatar?: string
  lastMessage?: string
  timestamp?: string
  unreadCount?: number
  status?: "online" | "offline" | "idle" | "dnd"
  description?: string
  membersCount?: number
}