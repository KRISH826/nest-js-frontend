"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Sun,
  Moon,
  LogOut,
  Video,
  Phone,
  Menu,
  Users2,
  Lock,
  Info,
  UserPlus
} from "lucide-react"

interface ChatHeaderProps {
  roomName: string
  isDm: boolean
  dmStatus?: string
  membersCount?: number
  searchQuery: string
  setSearchQuery: (query: string) => void
  theme: "light" | "dark"
  onThemeToggle: () => void
  onResetProfile: () => void
  onToggleSidebar: () => void // Hamburger for mobile view
  onToggleInfoPane?: () => void // Info panel toggle
  showInfoPane?: boolean
}

export function ChatHeader({
  roomName,
  isDm,
  dmStatus = "offline",
  membersCount = 1,
  searchQuery,
  setSearchQuery,
  theme,
  onThemeToggle,
  onResetProfile,
  onToggleSidebar,
  onToggleInfoPane,
  showInfoPane = false
}: ChatHeaderProps) {
  const isAi = roomName.toLowerCase().includes("ai")
  const initials = roomName.substring(0, 2).toUpperCase()

  return (
    <header className="px-5 py-4 flex flex-row justify-between items-center gap-3 border-b border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 flex-shrink-0 select-none">
      {/* Mobile Menu & Active Info */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Hamburger menu */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleSidebar}
          className="md:hidden text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg shrink-0 cursor-pointer"
          title="Toggle Navigation"
        >
          <Menu className="w-4.5 h-4.5" />
        </Button>

        {/* Room / DM Meta details */}
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-10 w-10 ring-2 ring-zinc-200/10">
            <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              {roomName.toLowerCase().includes("general") ? "✨" : initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-zinc-850 dark:text-zinc-100 tracking-tight text-sm sm:text-base truncate">
                {roomName}
              </h1>
              {!isDm && (
                <Lock className="w-3.5 h-3.5 text-zinc-450 dark:text-zinc-550" />
              )}
              {isAi && (
                <span className="px-1 py-0.25 text-[8px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/20 rounded">
                  AI
                </span>
              )}
            </div>

            <p className="text-[11px] text-zinc-450 dark:text-zinc-500 flex items-center gap-1 mt-0.5 leading-none">
              {isDm ? (
                <span className="flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    dmStatus === "online"
                      ? "bg-emerald-500"
                      : dmStatus === "idle" || dmStatus === "away"
                      ? "bg-amber-500"
                      : dmStatus === "dnd" || dmStatus === "busy"
                      ? "bg-rose-500"
                      : "bg-zinc-400"
                  }`} />
                  <span className="capitalize">{dmStatus}</span>
                </span>
              ) : (
                <>
                  <Users2 className="w-3.5 h-3.5 text-zinc-450" />
                  <span>{membersCount} members</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search Input - Desktop only */}
        <div className="relative max-w-[140px] sm:max-w-[180px] hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <Input
            type="text"
            placeholder="Search chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8.5 h-8.5 text-xs bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-200/40 dark:border-zinc-800/40 focus-visible:ring-indigo-500/30 rounded-xl"
          />
        </div>

        {/* Video / Phone Call Actions */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
          title="Start Audio Call"
        >
          <Phone className="w-4.5 h-4.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
          title="Start Video Call"
        >
          <Video className="w-4.5 h-4.5" />
        </Button>

        {/* Info pane Toggle */}
        {onToggleInfoPane && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onToggleInfoPane}
            className={`rounded-lg cursor-pointer transition-all ${
              showInfoPane 
                ? "bg-indigo-550/10 text-indigo-650 dark:text-indigo-400 hover:bg-indigo-550/15" 
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
            title="Toggle Info Pane"
          >
            <Info className="w-4.5 h-4.5" />
          </Button>
        )}

        <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-1.5 hidden sm:block" />

        {/* Theme Toggle Button */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onThemeToggle}
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </Button>

        {/* Reset profile name */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onResetProfile}
          className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg cursor-pointer"
          title="Reset Identity Name"
        >
          <LogOut className="w-4.5 h-4.5" />
        </Button>
      </div>
    </header>
  )
}
