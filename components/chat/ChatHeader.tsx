"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import {
  Search,
  Sun,
  Moon,
  LogOut,
  Video,
  Phone,
  Menu,
  Sparkles,
  Users2,
  Lock,
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
}: ChatHeaderProps) {
  const isAi = roomName.toLowerCase().includes("ai")

  return (
    <header className="px-4 py-3 flex flex-row justify-between items-center gap-3 border-b border-zinc-200/50 dark:border-zinc-800/40 bg-white/30 dark:bg-zinc-950/20 backdrop-blur-xs select-none">
      {/* Mobile Menu & Active Info */}
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Mobile Hamburger menu */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleSidebar}
          className="md:hidden text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-xl shrink-0 cursor-pointer"
          title="Toggle Navigation"
        >
          <Menu className="w-4.5 h-4.5" />
        </Button>

        {/* Room / DM Meta details */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className="h-8.5 w-8.5 ring-2 ring-zinc-200/10">
            {isDm ? (
              <AvatarFallback className="bg-zinc-250 dark:bg-zinc-850 text-zinc-650 dark:text-zinc-350 text-xs font-semibold">
                {roomName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            ) : (
              <AvatarFallback className="bg-indigo-600 text-white font-semibold text-xs flex items-center justify-center">
                {roomName.toLowerCase().includes("general") ? "✨" : "#"}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight text-xs sm:text-sm truncate">
                {roomName}
              </h1>
              {!isDm && (
                <Lock className="w-2.75 h-2.75 text-zinc-400 dark:text-zinc-500" />
              )}
              {isAi && (
                <span className="px-1 py-0.25 text-[8px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/20 rounded">
                  AI
                </span>
              )}
            </div>

            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5 select-none leading-none">
              {isDm ? (
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    dmStatus === "online"
                      ? "bg-emerald-500"
                      : dmStatus === "idle"
                      ? "bg-amber-500"
                      : dmStatus === "dnd"
                      ? "bg-rose-500"
                      : "bg-zinc-400"
                  }`} />
                  <span className="capitalize">{dmStatus}</span>
                </span>
              ) : (
                <>
                  <Users2 className="w-3 h-3 text-zinc-450" />
                  <span>{membersCount} members</span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Search Input - Desktop only */}
        <div className="relative max-w-[140px] sm:max-w-[180px] hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          <Input
            type="text"
            placeholder="Search chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-[11px] bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200/40 dark:border-zinc-800/40 focus-visible:ring-indigo-500/30 rounded-xl"
          />
        </div>

        {/* Video / Phone Controls */}
        <div className="hidden sm:flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-405 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-xl cursor-pointer"
            title="Start Video Call"
          >
            <Video className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-405 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-xl cursor-pointer"
            title="Start Audio Call"
          >
            <Phone className="w-4 h-4" />
          </Button>
        </div>

        <div className="hidden sm:block h-5 w-px bg-zinc-200 dark:bg-zinc-800" />



        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onThemeToggle}
          className="text-zinc-505 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded-xl cursor-pointer"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </Button>

        {/* Logout reset */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onResetProfile}
          className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-xl cursor-pointer"
          title="Reset Name Identity"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
