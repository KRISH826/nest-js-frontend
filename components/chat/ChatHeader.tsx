"use client"

import * as React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

export function ChatHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const onThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    const root = window.document.documentElement
    if (next === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }

  return (
    <header className="px-5 py-4 flex flex-row justify-between items-center gap-3 border-b border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 flex-shrink-0 select-none">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-10 w-10 ring-2 ring-zinc-200/10">
            <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              ✨
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-zinc-850 dark:text-zinc-100 tracking-tight text-sm sm:text-base truncate">
                Design System & UI Sync
              </h1>
              <Lock className="w-3.5 h-3.5 text-zinc-450 dark:text-zinc-550" />
            </div>

            <p className="text-[11px] text-zinc-450 dark:text-zinc-500 flex items-center gap-1 mt-0.5 leading-none">
              <Users2 className="w-3.5 h-3.5 text-zinc-450" />
              <span>8 members</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
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

        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-lg cursor-pointer transition-all bg-indigo-550/10 text-indigo-650 dark:text-indigo-400 hover:bg-indigo-550/15"
          title="Toggle Info Pane"
        >
          <Info className="w-4.5 h-4.5" />
        </Button>

        <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-1.5 hidden sm:block" />

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onThemeToggle}
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-55 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg cursor-pointer"
          title="Reset Identity Name"
        >
          <LogOut className="w-4.5 h-4.5" />
        </Button>
      </div>
    </header>
  )
}
