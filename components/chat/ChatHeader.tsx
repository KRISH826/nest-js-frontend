"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import {
  Search,
  Sun,
  Moon,
  LogOut,
  MessageCircle,
  Users2,
} from "lucide-react"

interface ChatHeaderProps {
  userName: string
  searchQuery: string
  setSearchQuery: (query: string) => void
  theme: "light" | "dark"
  onThemeToggle: () => void
  onResetProfile: () => void
}

export function ChatHeader({
  userName,
  searchQuery,
  setSearchQuery,
  theme,
  onThemeToggle,
  onResetProfile,
}: ChatHeaderProps) {
  return (
    <header className="px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-zinc-200/50 dark:border-zinc-800/40 bg-white/30 dark:bg-zinc-950/20 backdrop-blur-xs">
      <div className="flex items-center gap-3 self-start sm:self-center">
        <div className="p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">Aether Workspace</h1>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
            <Users2 className="w-3.5 h-3.5" />
            <span>3 active members</span>
          </p>
        </div>
      </div>

      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-200/40 dark:border-zinc-800/20">
        {/* Embedded Search bar */}
        <div className="relative max-w-[200px] hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <Input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200/40 dark:border-zinc-800/40 focus-visible:ring-indigo-500/30"
          />
        </div>

        {/* Avatar Group of virtual users */}
        <AvatarGroup className="hidden sm:flex">
          <Avatar size="default">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Sarah Jenkins" />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" alt="Alex Rivers" />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar size="default" className="bg-amber-500/10 border-amber-500/20">
            <AvatarFallback className="text-amber-500 font-bold dark:bg-amber-500/10">AI</AvatarFallback>
          </Avatar>
          <AvatarGroupCount className="text-[10px] font-bold">+0</AvatarGroupCount>
        </AvatarGroup>

        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

        {/* User Profile Info */}
        {userName && (
          <div className="flex items-center gap-2 bg-zinc-100/50 dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-800/20 py-1.5 pl-2.5 pr-1.5 rounded-full">
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 max-w-[80px] truncate">{userName}</span>
            <Avatar size="sm" className="bg-indigo-500 text-white font-bold ring-2 ring-indigo-500/20">
              <AvatarFallback className="bg-indigo-600 text-white text-[10px] font-semibold">
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* Toolbar Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onThemeToggle}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 rounded-xl cursor-pointer"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onResetProfile}
            className="text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl cursor-pointer"
            title="Reset Identity"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
