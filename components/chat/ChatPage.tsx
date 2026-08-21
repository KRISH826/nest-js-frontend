"use client"

import React from "react"
import { ChatSidebar } from "./ChatSidebar"
import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { ChatInput } from "./ChatInput"

export default function ChatPage() {
    return (
        <div className="h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
            {/* 1. Skype/Teams Sidebar (App Rail + Chat List) */}
            <ChatSidebar />

            {/* 2. Main Chat Workspace */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <ChatHeader />
                <MessageList />
                <ChatInput />
            </div>
        </div>
    )
}