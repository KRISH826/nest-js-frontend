"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChatRoom } from "@/types/chat"
import {
  Search,
  Plus,
  Hash,
  Sparkles,
} from "lucide-react"

interface ChatSidebarProps {
  rooms: ChatRoom[]
  activeRoomId: string
  onSelectRoom: (roomId: string) => void
  userName: string
  onCreateRoomClick: () => void
}

export function ChatSidebar({
  rooms,
  activeRoomId,
  onSelectRoom,
  userName,
  onCreateRoomClick,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter channels based on search query
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (room.lastMessage && room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const channels = filteredRooms.filter((r) => r.type === "channel")

  return (
    <aside className="w-full md:w-80 h-full flex flex-col border-r border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xs select-none">
      {/* Header: User Profile */}
      <div className="p-4 border-b border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <Avatar className="ring-2 ring-indigo-500/10 h-10 w-10">
            <AvatarFallback className="bg-indigo-600 text-white font-bold text-sm">
              {userName ? userName.substring(0, 2).toUpperCase() : "ME"}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 max-w-[150px] truncate">
            {userName || "Guest User"}
          </span>
        </div>

        {/* Create Chat Room button */}
        <Button
          onClick={onCreateRoomClick}
          variant="outline"
          size="icon-sm"
          className="rounded-xl border-zinc-200/60 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 cursor-pointer shadow-xs text-zinc-650 dark:text-zinc-300"
          title="Create New Channel"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>


      {/* Search Input */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <Input
            type="text"
            placeholder="Search channels & people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs bg-zinc-200/20 dark:bg-zinc-900/40 border-zinc-200/50 dark:border-zinc-800/40 focus-visible:ring-indigo-500/20 rounded-xl"
          />
        </div>
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-fade space-y-4">
        {/* Section: Channels */}
        <div>
          <div className="flex items-center justify-between px-2.5 py-1 text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            <span>Rooms & Channels</span>
            <span className="bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded-md font-medium text-[9px]">
              {channels.length}
            </span>
          </div>

          <div className="mt-1 space-y-0.5">
            {channels.map((room) => {
              const isActive = room.id === activeRoomId
              const isSocketRoom = room.id === "general"

              return (
                <button
                  key={room.id}
                  onClick={() => onSelectRoom(room.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 group relative ${
                    isActive
                      ? "bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold"
                      : "hover:bg-zinc-150/60 dark:hover:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                        isActive
                          ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                          : isSocketRoom
                          ? "bg-indigo-500/5 text-indigo-550 dark:text-indigo-400/80"
                          : "bg-zinc-200/40 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {isSocketRoom ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <Hash className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold truncate leading-tight">
                        {room.name}
                      </span>
                      <span
                        className={`text-[10px] truncate leading-tight mt-0.5 max-w-[170px] ${
                          isActive
                            ? "text-indigo-500/80 dark:text-indigo-400/70"
                            : "text-zinc-400 dark:text-zinc-550"
                        }`}
                      >
                        {room.lastMessage || "No messages yet"}
                      </span>
                    </div>
                  </div>

                  {/* Badges / Status */}
                  <div className="flex flex-col items-end shrink-0 gap-1 pl-1">
                    <span
                      className={`text-[9px] font-medium ${
                        isActive
                          ? "text-indigo-500 dark:text-indigo-400"
                          : "text-zinc-450 dark:text-zinc-550"
                      }`}
                    >
                      {room.timestamp || ""}
                    </span>
                    {room.unreadCount && room.unreadCount > 0 ? (
                      <span
                        className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 min-w-4 text-center leading-none bg-indigo-600 text-white dark:bg-indigo-500"
                      >
                        {room.unreadCount}
                      </span>
                    ) : null}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}

