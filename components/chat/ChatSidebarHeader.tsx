"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

interface ChatSidebarHeaderProps {
  roomsCount: number
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeFilter: "all" | "unread" | "groups"
  setActiveFilter: (filter: "all" | "unread" | "groups") => void
  onPlusClick: () => void
}

export function ChatSidebarHeader({
  roomsCount,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  onPlusClick,
}: ChatSidebarHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      {/* Messages Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold tracking-tight text-slate-800 dark:text-zinc-100 flex items-center gap-2">
          Messages
          <span className="text-[10px] bg-slate-200/70 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-medium px-2 py-0.5 rounded-md">
            {roomsCount}
          </span>
        </h1>
        <Button
          onClick={onPlusClick}
          size="icon"
          className="h-8 w-8 bg-indigo-600 hover:bg-indigo-650 rounded-sm cursor-pointer text-white transition-colors"
          title="Create New Room"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-3.5 h-3.5" />
        </span>
        <input
          type="text"
          placeholder="Search channels & users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500 rounded-lg border border-slate-200/80 dark:border-zinc-800/80 focus:bg-white dark:focus:bg-zinc-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all h-8.5"
        />
      </div>

      {/* Filter Tabs */}
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
  )
}
