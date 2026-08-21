"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchCode } from "lucide-react"

interface Room {
  id: string
  name: string
  type: string
  avatar: string | string[]
  lastMessage: string
  timestamp: string
  unreadCount: number
  status?: string
}

interface ChatSidebarChatListProps {
  filteredRooms: Room[]
}

export function ChatSidebarChatList({ filteredRooms }: ChatSidebarChatListProps) {
  const isSelected = (roomId: string) => roomId === "design-sync"

  const renderRoomAvatar = (room: Room) => {
    if (room.type === "direct") {
      return (
        <div className="relative flex-shrink-0">
          <Avatar className="h-9 w-9 rounded-xl border border-zinc-150 dark:border-zinc-800">
            <AvatarImage src={room.avatar as string} alt={room.name} className="object-cover" />
            <AvatarFallback className="bg-indigo-650 text-white font-bold text-[10px]">
              {room.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white dark:border-zinc-900 ${
            room.status === "online" ? "bg-emerald-500" :
            room.status === "away" ? "bg-amber-500" : "bg-zinc-400"
          }`} />
        </div>
      )
    } else {
      const avatars = room.avatar as string[]
      return (
        <div className="relative w-9 h-9 flex-shrink-0">
          <img src={avatars[0]} className="absolute top-0 left-0 w-6 h-6 rounded-lg object-cover border border-white dark:border-zinc-900" alt="Avatar 1" />
          <img src={avatars[1]} className="absolute bottom-0 right-0 w-6 h-6 rounded-lg object-cover border border-white dark:border-zinc-900 z-10" alt="Avatar 2" />
        </div>
      )
    }
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5 scrollbar-thin">
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => {
          const selected = isSelected(room.id)

          return (
            <div
              key={room.id}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                selected
                  ? "bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 text-slate-900 dark:text-zinc-100 shadow-[0_2px_6px_rgba(99,102,241,0.06)]"
                  : "hover:bg-slate-200/35 dark:hover:bg-zinc-800/20 text-slate-605 dark:text-zinc-400 border border-transparent"
              }`}
            >
              {renderRoomAvatar(room)}

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className={`text-sm sm:text-base font-semibold truncate ${
                    selected ? "text-slate-900 dark:text-zinc-100" : "text-slate-800 dark:text-zinc-300"
                  } ${room.unreadCount > 0 ? "font-bold text-indigo-600 dark:text-indigo-400" : ""}`}>
                    {room.name}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-slate-400 dark:text-zinc-550 whitespace-nowrap">
                    {room.timestamp}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className={`text-xs sm:text-sm truncate pr-2 ${
                    room.unreadCount > 0
                      ? "text-slate-900 dark:text-zinc-100 font-semibold"
                      : "text-slate-450 dark:text-zinc-500"
                  }`}>
                    {room.lastMessage}
                  </p>

                  {room.unreadCount > 0 ? (
                    <span className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-455 rounded-full flex-shrink-0" />
                  ) : null}
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <SearchCode className="w-8 h-8 text-slate-300 dark:text-zinc-700 mb-2 animate-pulse" />
          <p className="text-xs font-semibold text-slate-400 dark:text-zinc-555 font-mono">No active threads</p>
        </div>
      )}
    </div>
  )
}
