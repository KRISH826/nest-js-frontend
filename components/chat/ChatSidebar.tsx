"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChatRoom } from "@/types/chat"
import {
  Search,
  Plus,
  Flame,
  MessageSquare,
  Users,
  Calendar,
  Phone,
  FileText,
  HelpCircle,
  Settings,
  Sparkles,
  SearchCode,
  Hash
} from "lucide-react"

interface ChatSidebarProps {
  rooms: ChatRoom[]
  activeRoomId: string
  onSelectRoom: (roomId: string) => void
  userName: string
  onCreateRoomClick: () => void
  themeMode: "light" | "dark"
  setThemeMode: (theme: "light" | "dark") => void
}

export function ChatSidebar({
  rooms,
  activeRoomId,
  onSelectRoom,
  userName,
  onCreateRoomClick,
  themeMode,
  setThemeMode
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "groups">("all")
  const [activeRailTab, setActiveRailTab] = useState<"chat" | "teams" | "calendar" | "calls" | "files">("chat")

  // Filter channels based on search query and active filter tabs
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (room.lastMessage && room.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
    
    if (!matchesSearch) return false

    if (activeFilter === "unread") return (room.unreadCount || 0) > 0
    if (activeFilter === "groups") return room.type === "channel"
    return true
  })

  // Helper to render avatars and status indicators (Skype/Teams style)
  const renderRoomAvatar = (room: ChatRoom) => {
    const status = room.status || "offline"
    const initials = room.name.substring(0, 2).toUpperCase()

    return (
      <div className="relative flex-shrink-0">
        <Avatar className="h-10 w-10 ring-2 ring-zinc-200/10 select-none">
          {room.avatar ? (
            <AvatarImage src={room.avatar} alt={room.name} className="object-cover" />
          ) : null}
          <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        {/* Status dot */}
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-zinc-900 ${
          status === "online" ? "bg-emerald-500" :
          status === "dnd" ? "bg-rose-500" :
          status === "idle" ? "bg-amber-500" : "bg-zinc-400"
        }`} />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-row flex-shrink-0 z-10 select-none">
      {/* ========================================== */}
      {/* LEFT APP RAIL (Teams-Style vertical rail) */}
      {/* ========================================== */}
      <div className="hidden sm:flex flex-col items-center justify-between w-16 md:w-20 bg-slate-900 border-r border-slate-950 flex-shrink-0 py-4 z-20">
        <div className="flex flex-col items-center w-full gap-5">
          {/* Logo */}
          <div className="relative group cursor-pointer mb-2">
            <div className="absolute inset-0 rounded-xl bg-indigo-500 blur-sm opacity-55 animate-pulse" />
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-lg">
              <Flame className="w-5.5 h-5.5" />
            </div>
          </div>

          {/* Rail Items */}
          <button
            onClick={() => setActiveRailTab("chat")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group cursor-pointer ${
              activeRailTab === "chat"
                ? "bg-slate-800 text-indigo-400"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
            title="Chat Workspace"
          >
            <MessageSquare className="w-5.5 h-5.5" />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500" />
            {activeRailTab === "chat" && (
              <div className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-md origin-left" />
            )}
          </button>

          <button
            onClick={() => setActiveRailTab("teams")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group cursor-pointer ${
              activeRailTab === "teams"
                ? "bg-slate-800 text-indigo-400"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
            title="Teams & Projects"
          >
            <Users className="w-5.5 h-5.5" />
            {activeRailTab === "teams" && (
              <div className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-md origin-left" />
            )}
          </button>

          <button
            onClick={() => setActiveRailTab("calendar")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group cursor-pointer ${
              activeRailTab === "calendar"
                ? "bg-slate-800 text-indigo-400"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
            title="Calendar Meetings"
          >
            <Calendar className="w-5.5 h-5.5" />
            {activeRailTab === "calendar" && (
              <div className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-md origin-left" />
            )}
          </button>

          <button
            onClick={() => setActiveRailTab("calls")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group cursor-pointer ${
              activeRailTab === "calls"
                ? "bg-slate-800 text-indigo-400"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
            title="Calls History"
          >
            <Phone className="w-5.5 h-5.5" />
            {activeRailTab === "calls" && (
              <div className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-md origin-left" />
            )}
          </button>

          <button
            onClick={() => setActiveRailTab("files")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 group cursor-pointer ${
              activeRailTab === "files"
                ? "bg-slate-800 text-indigo-400"
                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
            title="Shared Files"
          >
            <FileText className="w-5.5 h-5.5" />
            {activeRailTab === "files" && (
              <div className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-md origin-left" />
            )}
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          {/* Quick Theme Switcher */}
          <button
            onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all cursor-pointer"
            title="Switch Theme"
          >
            <Sparkles className="w-4.5 h-4.5" />
          </button>

          <button className="flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all cursor-pointer">
            <HelpCircle className="w-4.5 h-4.5" />
          </button>
          
          <button className="flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all cursor-pointer">
            <Settings className="w-4.5 h-4.5" />
          </button>

          <div className="relative mt-2">
            <Avatar className="h-9 w-9 border border-slate-700 object-cover cursor-pointer">
              <AvatarFallback className="bg-indigo-650 text-white font-bold text-xs">
                {userName ? userName.substring(0, 2).toUpperCase() : "ME"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* SKYPE CHAT LIST SIDEBAR                    */}
      {/* ========================================== */}
      <div className="w-full sm:w-80 h-full bg-white dark:bg-zinc-900/90 border-r border-slate-200/60 dark:border-zinc-800/80 flex-shrink-0 flex flex-col">
        {/* Sidebar Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              Chat
              <span className="text-xs bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-semibold px-2 py-0.5 rounded-full">
                {rooms.length}
              </span>
            </h1>
            <div className="flex items-center gap-1.5">
              <Button
                onClick={onCreateRoomClick}
                variant="ghost"
                size="icon-sm"
                className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg cursor-pointer"
                title="New Room"
              >
                <Plus className="w-4.5 h-4.5" />
              </Button>
            </div>
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
              const isSelected = room.id === activeRoomId
              const isSocketRoom = room.id === "general"

              return (
                <div
                  key={room.id}
                  onClick={() => onSelectRoom(room.id)}
                  className={`flex items-center gap-3.5 px-3 py-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-indigo-500/10 dark:bg-indigo-500/15 border-l-3 border-indigo-500 text-slate-900 dark:text-zinc-100 shadow-sm"
                      : "hover:bg-slate-100/70 dark:hover:bg-zinc-800/40 text-slate-600 dark:text-zinc-300"
                  }`}
                >
                  {renderRoomAvatar(room)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className={`text-sm font-semibold truncate ${
                        isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-zinc-200"
                      } ${room.unreadCount && room.unreadCount > 0 ? "font-bold" : ""}`}>
                        {room.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-550 whitespace-nowrap">
                        {room.timestamp || ""}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate pr-2 ${
                        room.unreadCount && room.unreadCount > 0 
                          ? "text-slate-900 dark:text-zinc-100 font-medium" 
                          : "text-slate-400 dark:text-zinc-500"
                      }`}>
                        {room.lastMessage || "No messages yet"}
                      </p>
                      
                      {room.unreadCount && room.unreadCount > 0 ? (
                        <span className="flex-shrink-0 flex items-center justify-center min-w-4.5 h-4.5 px-1 bg-indigo-650 text-[10px] font-bold text-white rounded-full">
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
              <p className="text-sm font-medium text-slate-400 dark:text-zinc-550">No chats found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
