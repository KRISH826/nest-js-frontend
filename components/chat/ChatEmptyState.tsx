"use client"

import * as React from "react"
import { MessageSquare, Users, ShieldCheck, Sparkles, Plus } from "lucide-react"
import JoinRoom from "./JoinRoom"
import { Button } from "@/components/ui/button"

interface ChatEmptyStateProps {
  onOpenCreateRoom?: () => void
}

export function ChatEmptyState({ onOpenCreateRoom }: ChatEmptyStateProps) {
  return (
    <div className="flex-1 h-full w-full flex flex-col items-center justify-center p-8 sm:p-12 bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100/80 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden select-none">
      
      {/* Main Container Card */}
      <div className="max-w-3xl sm:max-w-4xl w-full flex flex-col items-center text-center relative z-10 space-y-8">

        {/* Header Text */}
        <div className="space-y-3 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2.5 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-800 dark:from-zinc-100 dark:via-indigo-200 dark:to-zinc-300 bg-clip-text text-transparent">
            No Conversation Selected
            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 animate-pulse" />
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
            Select a channel or thread from the sidebar to view messages, or start a new conversation to connect with your workspace team.
          </p>
        </div>

        {/* Quick Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4.5 w-full text-left pt-2">
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-100">Team Collaboration</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Join active public channels and collaborate in team discussions seamlessly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-violet-500/40 transition-all">
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-100">Real-time Messaging</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Instant live message updates powered by high-performance WebSockets.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-100">Secure Access</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Role-based room permissions and secure data encryption standards.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
          <JoinRoom
            trigger={
              <Button
                variant="default"
                size="lg"
                className="h-11 px-6 text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md cursor-pointer transition-all active:scale-95"
              >
                <Users className="w-4 h-4 mr-2" />
                Browse Available Rooms
              </Button>
            }
          />

          {onOpenCreateRoom ? (
            <Button
              variant="outline"
              size="lg"
              onClick={onOpenCreateRoom}
              className="h-11 px-6 text-xs sm:text-sm font-semibold border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 rounded-xl cursor-pointer transition-all active:scale-95 shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2 text-indigo-500" />
              Create Room
            </Button>
          ) : null}
        </div>

      </div>
    </div>
  )
}
