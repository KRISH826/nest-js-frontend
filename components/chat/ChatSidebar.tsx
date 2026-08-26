"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { ChatSidebarHeader } from "./ChatSidebarHeader"
import { ChatSidebarChatList, Room } from "./ChatSidebarChatList"
import { ChatDialogue } from "./ChatDialogue"
import { useGetChatroomsQuery } from "@/lib/api/chat-room/chatRoomApi"

interface ChatSidebarProps {
  onSelectChat: () => void
  selectedRoomId?: string | null
  onSelectRoomId?: (id: string) => void
}


function formatTimestamp(dateStr?: string) {
  if (!dateStr) return "Just now"
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return "Just now"
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

export function ChatSidebar({ onSelectChat, selectedRoomId, onSelectRoomId }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "groups">("all")
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false)

  const { data: chatroomsResponse, isFetching } = useGetChatroomsQuery()

  const rooms: Room[] = useMemo(() => {
    if (!chatroomsResponse?.data) return []
    return chatroomsResponse.data.map((room) => ({
      id: room._id,
      name: room.name,
      avatar: room.avatar?.url || undefined,
      lastMessage: room.description || "Workspace chat room",
      timestamp: formatTimestamp(room.createdAt),
      unreadCount: 0,
      status: room.active ? "online" : "offline"
    }))
  }, [chatroomsResponse])

  return (
    <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900/60 border-r border-slate-200/50 dark:border-zinc-800/80 flex flex-col select-none relative transition-all duration-300">

      {/* 1. Sidebar Header (Title, Search, Filter Navigation Tabs) */}
      <ChatSidebarHeader
        roomsCount={rooms.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onPlusClick={() => setIsCreateRoomOpen(true)}
      />

      {/* 2. Room/Thread Message List */}
      <ChatSidebarChatList
        filteredRooms={rooms}
        isFetching={isFetching}
        selectedRoomId={selectedRoomId}
        onSelectRoomId={onSelectRoomId}
        onSelectChat={onSelectChat}
      />

      {/* 3. Create Room Modal Dialog */}
      <ChatDialogue
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
      />

    </div>
  )
}
