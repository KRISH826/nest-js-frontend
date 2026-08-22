"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Sun,
  Moon,
  LogOut,
  Video,
  Phone,
  Users2,
  Lock,
  Info,
  ArrowLeft,
  MoreVertical
} from "lucide-react"

interface ChatHeaderProps {
  onBack: () => void
}

export function ChatHeader({ onBack }: ChatHeaderProps) {
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
    <header className="px-4 sm:px-6 py-4.5 flex flex-row justify-between items-center border-b border-slate-200/40 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 flex-shrink-0 select-none">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        
        {/* Mobile Back Action Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="block sm:hidden text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200 h-8 w-8 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
          title="Back to messages list"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </Button>

        <Avatar className="h-9 w-9 rounded-xl border border-zinc-150 dark:border-zinc-800 shrink-0">
          <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
            #
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="font-bold text-slate-800 dark:text-zinc-100 tracking-tight text-sm truncate">
              Design System & UI Sync
            </h1>
            <Lock className="w-3 h-3 text-slate-400 dark:text-zinc-550 shrink-0" />
          </div>

          <p className="text-[10px] text-slate-450 dark:text-zinc-500 flex items-center gap-1 mt-0.5 leading-none">
            <Users2 className="w-3 h-3 text-slate-400 shrink-0" />
            <span>8 members</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search bar (desktop only) */}
        <div className="relative max-w-[130px] sm:max-w-[160px] hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search chat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8.5 h-8.5 w-full text-xs bg-slate-100/60 dark:bg-zinc-900/40 border border-transparent focus:bg-white dark:focus:bg-zinc-900 focus:border-zinc-300 dark:focus:border-zinc-800 rounded-lg outline-none transition-all"
          />
        </div>

        {/* Call Actions (desktop only) */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8.5 w-8.5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer hidden sm:inline-flex"
          title="Start Audio Call"
        >
          <Phone className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8.5 w-8.5 text-zinc-500 hover:text-zinc-855 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer hidden sm:inline-flex"
          title="Start Video Call"
        >
          <Video className="w-4 h-4" />
        </Button>

        {/* Info button (visible on all screen widths) */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8.5 w-8.5 rounded-lg cursor-pointer transition-all bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 hover:bg-indigo-500/15"
          title="Toggle Info Pane"
        >
          <Info className="w-4 h-4" />
        </Button>

        <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800 mx-1.5 hidden sm:block" />

        {/* Theme & Identity Settings (desktop only) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onThemeToggle}
          className="h-8.5 w-8.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer hidden sm:inline-flex"
          title="Toggle Theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8.5 w-8.5 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg cursor-pointer hidden sm:inline-flex"
          title="Reset Identity Name"
        >
          <LogOut className="w-4.5 h-4.5" />
        </Button>

        {/* Mobile Actions Dropdown Trigger (visible only on mobile viewports) */}
        <div className="block sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8.5 w-8.5 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg cursor-pointer"
              >
                <MoreVertical className="w-4.5 h-4.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-1 rounded-xl shadow-lg">
              <DropdownMenuItem 
                onClick={() => {}} 
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-705 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Audio Call</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {}} 
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-705 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 text-slate-400" />
                <span>Video Call</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-1 border-b border-slate-100 dark:border-zinc-800" />
              <DropdownMenuItem 
                onClick={onThemeToggle} 
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-705 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-slate-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>Toggle Theme</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {}} 
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-450" />
                <span>Reset Name</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </header>
  )
}
