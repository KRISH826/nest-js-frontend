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
          <Avatar className="h-10 w-10 ring-2 ring-zinc-200/10">
            <AvatarImage src={room.avatar} alt={room.name} className="object-cover" />
            <AvatarFallback className="bg-indigo-650 text-white font-bold text-xs">
              {room.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${
            room.status === "online" ? "bg-emerald-500" :
            room.status === "away" ? "bg-amber-500" : "bg-zinc-400"
          }`} />
        </div>
      )
    } else {
      return (
        <div className="relative w-10 h-10 flex-shrink-0">
          <img src={room.avatar[0]} className="absolute top-0 left-0 w-6.5 h-6.5 rounded-full object-cover border border-white dark:border-zinc-900" alt="Avatar 1" />
          <img src={room.avatar[1]} className="absolute bottom-0 right-0 w-6.5 h-6.5 rounded-full object-cover border border-white dark:border-zinc-900 z-10" alt="Avatar 2" />
        </div>
      )
    }
  }

  return (
    <div className="w-full sm:w-96 h-full bg-white dark:bg-zinc-900/90 border-r border-slate-200/60 dark:border-zinc-800/80 flex-shrink-0 flex flex-col select-none relative transition-all duration-300">
      
      {/* Sidebar Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-2">
            Chat
            <span className="text-xs bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-semibold px-2 py-0.5 rounded-full">
              {rooms.length}
            </span>
          </h1>
          <Button
            onClick={() => setIsCreateRoomOpen(true)}
            variant="ghost"
            size="icon"
            className="h-8.5 w-8.5 text-zinc-500 hover:text-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg cursor-pointer"
            title="Create New Room"
          >
            <Plus className="w-4.5 h-4.5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3.5">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <Input
            type="text"
            placeholder="Search chat list..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-zinc-800/60 text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 rounded-lg border border-transparent focus:bg-white dark:focus:bg-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all h-9.5"
          />
        </div>

        {/* Filter Pills Tabs */}
        <div className="flex items-center gap-1 border-b border-slate-100 dark:border-zinc-800/40 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("unread")}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeFilter === "unread"
                ? "bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setActiveFilter("groups")}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              activeFilter === "groups"
                ? "bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                : "text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
            }`}
          >
            Groups
          </button>
        </div>
      </div>

      {/* Room list items */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 scrollbar-thin">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => {
            const isSelected = room.id === "design-sync"

            return (
              <div
                key={room.id}
                className={`flex items-center gap-3.5 px-3 py-3 rounded-xl cursor-pointer transition-all ${
                  isSelected
                    ? "bg-indigo-500/10 dark:bg-indigo-500/15 border-l-3 border-indigo-500 text-slate-900 dark:text-zinc-100 shadow-sm"
                    : "hover:bg-slate-100/70 dark:hover:bg-zinc-800/40 text-slate-655 dark:text-zinc-300"
                }`}
              >
                {renderRoomAvatar(room)}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className={`text-sm font-semibold truncate ${
                      isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-850 dark:text-zinc-200"
                    } ${room.unreadCount > 0 ? "font-bold" : ""}`}>
                      {room.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 dark:text-zinc-555 whitespace-nowrap text-right">
                      {room.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className={`text-xs truncate pr-2 ${
                      room.unreadCount > 0 
                        ? "text-slate-900 dark:text-zinc-100 font-medium" 
                        : "text-slate-400 dark:text-zinc-555"
                    }`}>
                      {room.lastMessage}
                    </p>
                    
                    {room.unreadCount > 0 ? (
                      <span className="flex-shrink-0 flex items-center justify-center min-w-4.5 h-4.5 px-1 bg-indigo-600 text-[10px] font-bold text-white rounded-full">
                        {room.unreadCount}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <SearchCode className="w-9 h-9 text-slate-300 dark:text-zinc-700 mb-2" />
            <p className="text-sm font-medium text-slate-400 dark:text-zinc-555">No chats found</p>
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
