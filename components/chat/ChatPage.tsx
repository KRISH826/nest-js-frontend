"use client"

import React from "react"
import { ChatSidebar } from "./ChatSidebar"
import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { ChatInput } from "./ChatInput"
import { NamePromptDialog } from "./NamePromptDialog"
import ChatDialogue from "./ChatDialogue"
import { useChatState } from "@/hooks/useChatState"

export default function ChatPage() {
  const s = useChatState()
  if (!s.isMounted) return <div className="h-screen w-full flex items-center justify-center bg-zinc-950"><div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>

  return (
    <div className="h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      <div className={`${s.isSidebarOpen ? "flex w-full" : "hidden"} sm:flex sm:w-auto shrink-0 h-full`}>
        <ChatSidebar rooms={s.rooms} activeRoomId={s.activeRoomId} onSelectRoom={s.handleSelectRoom} userName={s.userName} onCreateRoomClick={() => s.setIsCreateRoomOpen(true)} themeMode={s.theme} setThemeMode={s.setTheme} />
      </div>
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${s.isSidebarOpen ? "hidden sm:flex" : "flex"}`}>
        <ChatHeader roomName={s.activeRoom.name} isDm={s.activeRoom.type === "dm"} dmStatus={s.activeRoom.status} membersCount={s.activeRoom.membersCount} searchQuery={s.searchQuery} setSearchQuery={s.setSearchQuery} theme={s.theme} onThemeToggle={s.toggleTheme} onResetProfile={s.handleResetProfile} onToggleSidebar={() => s.setIsSidebarOpen(true)} onToggleInfoPane={() => s.setShowInfoPane(!s.showInfoPane)} showInfoPane={s.showInfoPane} />
        <MessageList userName={s.userName} messages={s.activeMessages} searchQuery={s.searchQuery} isTyping={s.typingState.isTyping} typingUserName={s.typingState.userName} roomName={s.activeRoom.name} />
        <ChatInput onSendMessage={s.handleSendMessage} disabled={false} placeholderText={`Type a message to ${s.activeRoom.name}...`} />
      </div>
      <NamePromptDialog isOpen={s.isDialogOpen} onNameSubmit={s.handleNameSubmit} />
      <ChatDialogue isOpen={s.isCreateRoomOpen} onClose={() => s.setIsCreateRoomOpen(false)} />
    </div>
  )
}