"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  SearchCode
} from "lucide-react"

export function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "groups">("all")
  const [activeRailTab, setActiveRailTab] = useState<"chat" | "teams" | "calendar" | "calls" | "files">("chat")
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark")

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

  // Sync theme
  React.useEffect(() => {
    const root = window.document.documentElement
    if (themeMode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [themeMode])

  const renderRoomAvatar = (room: any) => {
    if (room.type === "direct") {
      return (
        <div className="relative flex-shrink-0">
          <Avatar className="h-10 w-10 ring-2 ring-zinc-200/10">
            <AvatarImage src={room.avatar} alt={room.name} className="object-cover" />
            <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
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
    <div className="h-full flex flex-row flex-shrink-0 z-10 select-none">
      {/* LEFT APP RAIL */}
      <div className="hidden sm:flex flex-col items-center justify-between w-16 md:w-20 bg-slate-900 border-r border-slate-950 flex-shrink-0 py-4 z-20">
        <div className="flex flex-col items-center w-full gap-5">
          <div className="relative group cursor-pointer mb-2">
            <div className="absolute inset-0 rounded-xl bg-indigo-500 blur-sm opacity-55 animate-pulse" />
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white shadow-lg">
              <Flame className="w-5.5 h-5.5" />
            </div>
          </div>

          <button
            onClick={() => setActiveRailTab("chat")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-305 group cursor-pointer ${
              activeRailTab === "chat" ? "bg-slate-800 text-indigo-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <MessageSquare className="w-5.5 h-5.5" />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500" />
            {activeRailTab === "chat" && <div className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-md origin-left" />}
          </button>

          <button
            onClick={() => setActiveRailTab("teams")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-305 group cursor-pointer ${
              activeRailTab === "teams" ? "bg-slate-800 text-indigo-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <Users className="w-5.5 h-5.5" />
          </button>

          <button
            onClick={() => setActiveRailTab("calendar")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-305 group cursor-pointer ${
              activeRailTab === "calendar" ? "bg-slate-800 text-indigo-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <Calendar className="w-5.5 h-5.5" />
          </button>

          <button
            onClick={() => setActiveRailTab("calls")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-305 group cursor-pointer ${
              activeRailTab === "calls" ? "bg-slate-800 text-indigo-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <Phone className="w-5.5 h-5.5" />
          </button>

          <button
            onClick={() => setActiveRailTab("files")}
            className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-305 group cursor-pointer ${
              activeRailTab === "files" ? "bg-slate-800 text-indigo-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
            }`}
          >
            <FileText className="w-5.5 h-5.5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 w-full">
          <button
            onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-all cursor-pointer"
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
                KP
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
          </div>
        </div>
      </div>

      {/* SKYPE CHAT LIST SIDEBAR */}
      <div className="w-full sm:w-80 h-full bg-white dark:bg-zinc-900/90 border-r border-slate-200/60 dark:border-zinc-800/80 flex-shrink-0 flex flex-col">
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-2">
              Chat
              <span className="text-xs bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-semibold px-2 py-0.5 rounded-full">
                {rooms.length}
              </span>
            </h1>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" />
            </Button>
          </div>

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
                      : "hover:bg-slate-100/70 dark:hover:bg-zinc-800/40 text-slate-600 dark:text-zinc-300"
                  }`}
                >
                  {renderRoomAvatar(room)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className={`text-sm font-semibold truncate ${
                        isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-zinc-200"
                      } ${room.unreadCount > 0 ? "font-bold" : ""}`}>
                        {room.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 dark:text-zinc-550 whitespace-nowrap text-right">
                        {room.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate pr-2 ${
                        room.unreadCount > 0 
                          ? "text-slate-900 dark:text-zinc-100 font-medium" 
                          : "text-slate-400 dark:text-zinc-550"
                      }`}>
                        {room.lastMessage}
                      </p>
                      
                      {room.unreadCount > 0 ? (
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
