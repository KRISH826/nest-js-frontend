"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, SearchCode } from "lucide-react"
import { CreateRoomDialog } from "./CreateRoomDialog"

export function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "groups">("all")
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false)

  // Static mock rooms data for Skype/Teams list
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

  const renderRoomAvatar = (room: any) => {
    if (room.type === "direct") {
      return (
        <div className="relative flex-shrink-0">
          <Avatar className="h-9 w-9 rounded-xl border border-zinc-150 dark:border-zinc-800">
            <AvatarImage src={room.avatar} alt={room.name} className="object-cover" />
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
      return (
        <div className="relative w-9 h-9 flex-shrink-0">
          <img src={room.avatar[0]} className="absolute top-0 left-0 w-6 h-6 rounded-lg object-cover border border-white dark:border-zinc-900" alt="Avatar 1" />
          <img src={room.avatar[1]} className="absolute bottom-0 right-0 w-6 h-6 rounded-lg object-cover border border-white dark:border-zinc-900 z-10" alt="Avatar 2" />
        </div>
      )
    }
  }

  return (
    <div className="w-full sm:w-[30%] h-full bg-zinc-50 dark:bg-zinc-900/60 border-r border-slate-200/50 dark:border-zinc-800/80 flex-shrink-0 flex flex-col select-none relative transition-all duration-300">
      
      {/* Sidebar Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold tracking-tight text-slate-800 dark:text-zinc-100 flex items-center gap-2">
            Messages
            <span className="text-[10px] bg-slate-200/70 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-medium px-2 py-0.5 rounded-md">
              {rooms.length}
            </span>
          </h1>
          <Button
            onClick={() => setIsCreateRoomOpen(true)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer text-slate-500 hover:text-slate-850 dark:text-zinc-400 dark:hover:text-zinc-200"
            title="Create New Room"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Minimal Search Input */}
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            type="text"
            placeholder="Search channels & users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100/60 dark:bg-zinc-950/40 text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 rounded-lg border border-transparent focus:bg-white dark:focus:bg-zinc-950 focus:border-zinc-300 dark:focus:border-zinc-800 outline-none transition-all h-8.5"
          />
        </div>

        {/* Minimal Filter Tabs */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 dark:text-zinc-500 border-b border-slate-200/40 dark:border-zinc-800/40 pb-2.5">
          <button
            onClick={() => setActiveFilter("all")}
            className={`cursor-pointer transition-colors hover:text-slate-700 dark:hover:text-zinc-200 ${
              activeFilter === "all" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
            }`}
          >
            All chats
          </button>
          <button
            onClick={() => setActiveFilter("unread")}
            className={`cursor-pointer transition-colors hover:text-slate-700 dark:hover:text-zinc-200 ${
              activeFilter === "unread" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setActiveFilter("groups")}
            className={`cursor-pointer transition-colors hover:text-slate-700 dark:hover:text-zinc-200 ${
              activeFilter === "groups" ? "text-indigo-600 dark:text-indigo-400 font-bold" : ""
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Professional Room List */}
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-0.5 scrollbar-thin">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => {
            const isSelected = room.id === "design-sync"

            return (
              <div
                key={room.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? "bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                    : "hover:bg-slate-200/35 dark:hover:bg-zinc-800/20 text-slate-600 dark:text-zinc-400 border border-transparent"
                }`}
              >
                {renderRoomAvatar(room)}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className={`text-xs sm:text-sm font-semibold truncate ${
                      isSelected ? "text-slate-900 dark:text-zinc-100" : "text-slate-800 dark:text-zinc-300"
                    } ${room.unreadCount > 0 ? "font-bold text-indigo-600 dark:text-indigo-400" : ""}`}>
                      {room.name}
                    </h3>
                    <span className="text-[9px] text-slate-400 dark:text-zinc-550 whitespace-nowrap">
                      {room.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className={`text-[11px] truncate pr-2 ${
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

      {/* Render Shadcn-based CreateRoomDialog component */}
      <CreateRoomDialog
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
      />

    </div>
  )
}
