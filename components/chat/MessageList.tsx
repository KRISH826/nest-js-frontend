"use client"

import * as React from "react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCheck,
  Download,
  FileCode,
  SmilePlus,
  Reply,
  MoreHorizontal
} from "lucide-react"

export function MessageList() {
  // Static messages history data matching the design spec
  const messages = [
    {
      id: "ds-m1",
      sender: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      content: "Hey everyone! I completed the draft specifications for the Skype/Teams hybrid component layout.",
      timestamp: "Yesterday 4:15 PM",
      isUser: false,
      reactions: [{ emoji: "👍", count: 4 }, { emoji: "🎉", count: 2 }]
    },
    {
      id: "ds-m2",
      sender: "Alex Rivers",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      content: "Awesome Sarah! I can start translating these specs into Tailwind CSS v4 variables directly.",
      timestamp: "Yesterday 4:20 PM",
      isUser: false,
      replyTo: { senderName: "Sarah Jenkins", text: "Hey everyone! I completed the draft specifications..." }
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
      isUser: false,
      attachment: {
        type: "file",
        name: "ui-design-spec-v2.pdf",
        size: "4.8 MB"
      }
    },
    {
      id: "ds-m5",
      sender: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      content: "Check out the new glassmorphism CSS variables in the screenshot!",
      timestamp: "10:42 AM",
      isUser: false,
      attachment: {
        type: "image",
        name: "Glassmorphism Preview",
        size: "1.2 MB",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600"
      }
    }
  ]

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-slate-50 dark:bg-zinc-950/20 scrollbar-thin relative">
      <div className="flex justify-center my-2">
        <span className="text-[11px] font-semibold tracking-wider text-slate-400 dark:text-zinc-550 bg-slate-200/50 dark:bg-zinc-900/60 px-3.5 py-1 rounded-full uppercase select-none">
          Secured workspace channel | Design System & UI Sync
        </span>
      </div>

      {messages.map((msg: any) => {
        const isUser = msg.isUser
        const allReactions = msg.reactions || []

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 group max-w-[85%] md:max-w-[70%] transition-all ${
              isUser ? "ml-auto flex-row-reverse" : "mr-auto"
            } animate-in fade-in duration-200`}
          >
            {/* Sender Avatar */}
            {!isUser && (
              <Avatar className="h-9 w-9 shrink-0 ring-2 ring-zinc-200/20 select-none mt-0.5">
                <AvatarImage src={msg.avatar} alt={msg.sender} className="object-cover" />
                <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-405 font-semibold text-xs flex items-center justify-center">
                  {msg.sender.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Message Bubble Container */}
            <div className={`flex flex-col relative ${isUser ? "items-end" : "items-start"}`}>
              <div className="flex items-center gap-1.5 mb-1 px-1 select-none">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400 pl-1">
                  {isUser ? "You" : msg.sender}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-550">{msg.timestamp}</span>
              </div>

              <div className="relative group/bubble flex items-center">
                {/* Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm text-sm break-words transition-all ${
                    isUser
                      ? "bg-indigo-650 text-white rounded-tr-none"
                      : "bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-slate-200/40 dark:border-zinc-800/60 rounded-tl-none"
                  }`}
                >
                  {/* Reply container */}
                  {msg.replyTo && (
                    <div className="mb-2 pl-2.5 border-l-2 border-indigo-400 bg-slate-100/80 dark:bg-zinc-800/80 text-[11px] py-1 px-1.5 rounded text-slate-500 dark:text-zinc-400 italic">
                      <span className="font-bold not-italic block mb-0.5 text-slate-655 dark:text-zinc-300">
                        {msg.replyTo.senderName}
                      </span>
                      {msg.replyTo.text}
                    </div>
                  )}

                  <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                  {/* Image attachment rendering */}
                  {msg.attachment?.type === "image" && (
                    <div className="mt-2.5 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-850">
                      <img
                        src={msg.attachment.url}
                        alt={msg.attachment.name}
                        className="max-h-60 w-full object-cover hover:scale-102 transition-transform duration-350 cursor-pointer"
                      />
                    </div>
                  )}

                  {/* File attachment rendering */}
                  {msg.attachment?.type === "file" && (
                    <div className="mt-2.5 flex items-center justify-between p-3 bg-slate-50 dark:bg-zinc-950/80 rounded-xl border border-slate-150 dark:border-zinc-800/80 min-w-[200px] sm:min-w-[240px]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 rounded-lg flex-shrink-0">
                          <FileCode className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200 truncate">
                            {msg.attachment.name}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-zinc-500">
                            {msg.attachment.size}
                          </p>
                        </div>
                      </div>
                      <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-zinc-800 rounded-lg text-slate-500 dark:text-zinc-400 cursor-pointer">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <div className={`flex items-center justify-end gap-1 mt-1.5 text-[9px] ${
                    isUser ? "text-indigo-200" : "text-slate-450 dark:text-zinc-550"
                  }`}>
                    <span>{msg.timestamp}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-indigo-300" />}
                  </div>
                </div>

                {/* Micro Reactions Popup Toolbar */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 px-1.5 py-1 rounded-full shadow-lg z-25 ${
                    isUser ? "right-full mr-2" : "left-full ml-2"
                  }`}
                >
                  <button className="text-xs hover:scale-130 transition-transform duration-100 cursor-pointer p-0.5">👍</button>
                  <button className="text-xs hover:scale-130 transition-transform duration-100 cursor-pointer p-0.5">❤️</button>
                  <button className="text-xs hover:scale-130 transition-transform duration-100 cursor-pointer p-0.5">🔥</button>
                  <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />
                  <button className="text-zinc-450 hover:text-zinc-650 dark:hover:text-zinc-205 p-0.5 cursor-pointer">
                    <SmilePlus className="w-3.5 h-3.5" />
                  </button>
                  <button className="text-zinc-450 hover:text-zinc-650 dark:hover:text-zinc-205 p-0.5 cursor-pointer">
                    <Reply className="w-3.5 h-3.5" />
                  </button>
                  <button className="text-zinc-450 hover:text-zinc-650 dark:hover:text-zinc-205 p-0.5 cursor-pointer">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Reaction Badges */}
              {allReactions.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5 px-1">
                  {allReactions.map((react: any, idx: number) => (
                    <button
                      key={idx}
                      className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800/60 rounded-full text-xs cursor-pointer hover:bg-slate-200 dark:hover:bg-zinc-800/95 transition-all select-none"
                    >
                      <span>{react.emoji}</span>
                      <span className="text-[10px] font-bold text-slate-500">{react.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </main>
  )
}
