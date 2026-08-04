"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChatRoom } from "@/types/chat"
import {
  Search,
  Plus,
  Hash,
  MessageSquare,
  Sparkles,
  ChevronDown,
  Circle,
  HelpCircle,
} from "lucide-react"

interface ChatSidebarProps {
  rooms: ChatRoom[]
  activeRoomId: string
  onSelectRoom: (roomId: string) => void
  userName: string
  onCreateRoomClick: () => void
}

type UserStatus = "online" | "idle" | "dnd" | "offline"

export function ChatSidebar({
  rooms,
  activeRoomId,
  onSelectRoom,
  userName,
  onCreateRoomClick,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [status, setStatus] = useState<UserStatus>("online")
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  // Status configuration mapping
  const statusConfig = {
    online: { color: "bg-emerald-500", label: "Available" },
    idle: { color: "bg-amber-500", label: "Away" },
    dnd: { color: "bg-rose-500", label: "Busy" },
    offline: { color: "bg-zinc-400", label: "Offline" },
  }

  // Filter channels based on search query
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (room.lastMessage && room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const channels = filteredRooms.filter((r) => r.type === "channel")

  return (
    <aside className="w-full md:w-80 h-full flex flex-col border-r border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xs select-none">
      {/* Header: User Profile & Status */}
      <div className="p-4 border-b border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-between relative">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="ring-2 ring-indigo-500/10 h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm">
                {userName ? userName.substring(0, 2).toUpperCase() : "ME"}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900 ${statusConfig[status].color} cursor-pointer shadow-sm flex items-center justify-center`}
              title={`Change Status (Current: ${statusConfig[status].label})`}
            />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 max-w-[120px] truncate">
              {userName || "Guest User"}
            </span>
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-0.5 hover:text-indigo-500 transition-colors"
            >
              <span>{statusConfig[status].label}</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
          </div>
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

        {/* Status Dropdown Menu */}
        {showStatusMenu && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowStatusMenu(false)}
            />
            <div className="absolute left-4 top-14 w-40 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-900 p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-100">
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => {
                    setStatus(key as UserStatus)
                    setShowStatusMenu(false)
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left ${
                    status === key
                      ? "text-zinc-900 dark:text-zinc-100 bg-zinc-50 dark:bg-zinc-850"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${cfg.color}`} />
                  <span>{cfg.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 group relative ${
                    isActive
                      ? "bg-indigo-600 dark:bg-indigo-650 text-white shadow-md shadow-indigo-600/10"
                      : "hover:bg-zinc-200/60 dark:hover:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`p-1.5 rounded-lg shrink-0 ${
                        isActive
                          ? "bg-white/15 text-white"
                          : isSocketRoom
                          ? "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400"
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
                            ? "text-indigo-100"
                            : "text-zinc-400 dark:text-zinc-500"
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
                          ? "text-indigo-150"
                          : "text-zinc-450 dark:text-zinc-550"
                      }`}
                    >
                      {room.timestamp || ""}
                    </span>
                    {room.unreadCount && room.unreadCount > 0 ? (
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 min-w-4 text-center leading-none ${
                          isActive
                            ? "bg-white text-indigo-650"
                            : "bg-indigo-600 text-white dark:bg-indigo-500"
                        }`}
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

