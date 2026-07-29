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