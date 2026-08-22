"use client"

import * as React from "react"
import { useState } from "react"
import { ChatSidebarHeader } from "./ChatSidebarHeader"
import { ChatSidebarChatList } from "./ChatSidebarChatList"
import { ChatDialogue } from "./ChatDialogue"

interface ChatSidebarProps {
  onSelectChat: () => void
}

export function ChatSidebar({ onSelectChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "groups">("all")
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false)

  const rooms = [
    {
      id: "design-sync",
      name: "Design System & UI Sync",
      type: "channel",
      avatar: [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
      ],
      lastMessage: "Sarah: Check out the new glassmorphism CSS variables!",
      timestamp: "10:42 AM",
      unreadCount: 3,
      status: "online"
    },
    {
      id: "marketing",
      name: "Marketing Launch Strategy",
      type: "channel",
      avatar: [
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
      ],
      lastMessage: "Alex: The spreadsheet is finalized.",
      timestamp: "Yesterday",
      unreadCount: 0,
      status: "offline"
    },
    {
      id: "sarah",
      name: "Sarah Jenkins",
      type: "direct",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      lastMessage: "I am finishing up the landing page graphics.",
      timestamp: "9:15 AM",
      unreadCount: 0,
      status: "online"
    },
    {
      id: "alex",
      name: "Alex Rivers",
      type: "direct",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      lastMessage: "Can you review my pull request on the auth guard hooks?",
      timestamp: "Tuesday",
      unreadCount: 0,
      status: "away"
    }
  ]

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false
    if (activeFilter === "unread") return room.unreadCount > 0
    if (activeFilter === "groups") return room.type === "channel"
    return true
  })

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
        filteredRooms={filteredRooms}
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
