"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function MessageList() {
  // Static messages history data matching the design spec (text messages only)
  const messages = [
    {
      id: "ds-m1",
      sender: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      content: "Hey everyone! I completed the draft specifications for the Skype/Teams hybrid component layout.",
      timestamp: "Yesterday 4:15 PM",
      isUser: false
    },
    {
      id: "ds-m2",
      sender: "Alex Rivers",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      content: "Awesome Sarah! I can start translating these specs into Tailwind CSS v4 variables directly.",
      timestamp: "Yesterday 4:20 PM",
      isUser: false
    },
    {
      id: "ds-m3",
      sender: "Krishnendu Pramanik",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      content: "Great progress. Can we make sure the borders are subtle? Like `slate-200/50` on light mode and `zinc-800/80` on dark mode.",
      timestamp: "Yesterday 5:02 PM",
      isUser: true
    },
    {
      id: "ds-m4",
      sender: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      content: "Absolutely! I have attached the asset pack containing the custom palette values and icon resources.",
      timestamp: "10:35 AM",
      isUser: false
    },
    {
      id: "ds-m5",
      sender: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      content: "Check out the new glassmorphism CSS variables in the screenshot!",
      timestamp: "10:42 AM",
      isUser: false
    }
  ]

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-50 dark:bg-zinc-950/20 scrollbar-thin">
      {messages.map((msg) => {
        const isUser = msg.isUser

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-[80%] ${
              isUser ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Sender Avatar */}
            {!isUser && (
              <Avatar className="h-9 w-9 shrink-0 select-none mt-0.5 animate-in fade-in duration-200">
                <AvatarImage src={msg.avatar} alt={msg.sender} className="object-cover" />
                <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-xs flex items-center justify-center">
                  {msg.sender.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Bubble */}
            <div className="flex flex-col">
              <div className={`flex items-center gap-1.5 mb-0.5 px-1 select-none ${isUser ? "justify-end" : "justify-start"}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-450">
                  {isUser ? "You" : msg.sender}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-550">{msg.timestamp}</span>
              </div>

              <div
                className={`px-4 py-2.5 rounded-2xl shadow-xs text-xs sm:text-sm break-words leading-relaxed animate-in zoom-in-95 duration-150 ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-slate-200/40 dark:border-zinc-800/60 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        )
      })}
    </main>
  )
}
