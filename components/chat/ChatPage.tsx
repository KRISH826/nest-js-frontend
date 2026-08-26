"use client"

import React, { useState } from "react"
import { ChatSidebar } from "./ChatSidebar"
import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { ChatInput } from "./ChatInput"
import { ChatEmptyState } from "./ChatEmptyState"
import { useChatSocket } from "@/hooks/useChatMessage"

export default function ChatPage() {
  const [activeView, setActiveView] = useState<"sidebar" | "chat">("sidebar")
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const { liveMessage, sendMessage, isConnected } = useChatSocket(selectedRoomId)

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId);
    setActiveView("chat");
  };

  return (
    <div className="h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      {/* 1. Sidebar Container */}
      <div className={`h-full ${activeView === "sidebar" ? "w-full block" : "hidden"} sm:block sm:w-[30%] sm:shrink-0`}>
        <ChatSidebar
          onSelectChat={() => setActiveView("chat")}
          selectedRoomId={selectedRoomId}
          onSelectRoomId={handleSelectRoom}
        />
      </div>

      {/* 2. Main Chat Workspace */}
      {selectedRoomId ? (
        <div className={`h-full flex-col overflow-hidden ${activeView === "chat" ? "w-full flex" : "hidden"} sm:flex sm:flex-1`}>
          <ChatHeader onBack={() => setActiveView("sidebar")} selectedRoomId={selectedRoomId || undefined} />
          <MessageList roomId={selectedRoomId} liveMessages={liveMessage} />
          <ChatInput onSendMessage={(text) => sendMessage(text)}
            disabled={!isConnected} />
        </div>
      ) : (
        <div className={`h-full flex-col overflow-hidden ${activeView === "chat" ? "w-full flex" : "hidden"} sm:flex sm:flex-1`}>
          <ChatEmptyState />
        </div>
      )}
    </div>
  )
}