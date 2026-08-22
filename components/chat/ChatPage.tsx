"use client"

import React, { useState } from "react"
import { ChatSidebar } from "./ChatSidebar"
import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { ChatInput } from "./ChatInput"

export default function ChatPage() {
  const [activeView, setActiveView] = useState<"sidebar" | "chat">("sidebar")

  return (
    <div className="h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      
      {/* 1. Sidebar Container (30% width on Desktop, full-width toggle on Mobile) */}
      <div className={`h-full ${
        activeView === "sidebar" ? "w-full block" : "hidden"
      } sm:block sm:w-[30%] sm:shrink-0`}>
        <ChatSidebar onSelectChat={() => setActiveView("chat")} />
      </div>

      {/* 2. Main Chat Workspace (70% width on Desktop, full-width toggle on Mobile) */}
      <div className={`h-full flex-col overflow-hidden ${
        activeView === "chat" ? "w-full flex" : "hidden"
      } sm:flex sm:flex-1`}>
        <ChatHeader onBack={() => setActiveView("sidebar")} />
        <MessageList />
        <ChatInput />
      </div>
    </div>
  )
}