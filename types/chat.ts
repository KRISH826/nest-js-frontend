export type SenderType = "user" | "other" | "ai"

export interface Message {
  id: string
  sender: string
  senderType: SenderType
  avatar: string
  content: string
  timestamp: string
}

export interface Responder {
  name: string
  type: SenderType
  avatar: string
  templates: string[]
}
