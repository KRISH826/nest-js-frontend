import ChatPage from "@/components/chat/ChatPage"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback={null}>
      <ChatPage />
    </Suspense>
  )
}
