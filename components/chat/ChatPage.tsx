"use client"

import React, { useState } from "react"
import { ChatSidebar } from "./ChatSidebar"
import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { ChatInput } from "./ChatInput"
import { ChatEmptyState } from "./ChatEmptyState"

export default function ChatPage() {
  const [activeView, setActiveView] = useState<"sidebar" | "chat">("sidebar")
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)

  return (
    <div className="h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      {/* 1. Sidebar Container */}
      <div className={`h-full ${activeView === "sidebar" ? "w-full block" : "hidden"} sm:block sm:w-[30%] sm:shrink-0`}>
        <ChatSidebar
          onSelectChat={() => setActiveView("chat")}
          selectedRoomId={selectedRoomId}
          onSelectRoomId={(id) => setSelectedRoomId(id)}
        />
      </div>

      {/* 2. Main Chat Workspace */}
      {selectedRoomId ? (
        <div className={`h-full flex-col overflow-hidden ${activeView === "chat" ? "w-full flex" : "hidden"} sm:flex sm:flex-1`}>
          <ChatHeader onBack={() => setActiveView("sidebar")} selectedRoomId={selectedRoomId || undefined} />
          <MessageList />
          <ChatInput />
        </div>
      ) : (
        <div className={`h-full flex-col overflow-hidden ${activeView === "chat" ? "w-full flex" : "hidden"} sm:flex sm:flex-1`}>
          <ChatEmptyState />
        </div>
      )}
    </div>
  )
}