"use client"

import * as React from "react"
import { useEffect, useRef } from "react"
import { Message } from "@/types/chat"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import {
  Bot,
  Sparkles,
  HelpCircle,
} from "lucide-react"

interface MessageListProps {
  userName: string
  messages: Message[]
  searchQuery: string
}

export function MessageList({
  messages,
  searchQuery,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Filter messages based on search query
  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-zinc-50/20 dark:bg-zinc-950/10 scrollbar-fade">
      {/* Workspace Welcome Banner */}
      <div className="p-4 rounded-2xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/10 dark:border-indigo-500/20 flex gap-3.5 mb-2 items-start">
        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
          <Sparkles className="w-4.5 h-4.5" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            Aether General Chat
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Welcome to the team workspace! This channel is open for discussions and updates.
          </p>
        </div>
      </div>

      {searchQuery && (
        <div className="text-xs text-zinc-400 dark:text-zinc-500 italic pb-2 border-b border-zinc-200/20 dark:border-zinc-800/20">
          Showing search results matching &quot;{searchQuery}&quot; ({filteredMessages.length} found)
        </div>
      )}

      {filteredMessages.length === 0 ? (
        <div className="h-48 flex flex-col items-center justify-center text-center gap-2">
          <HelpCircle className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
          <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600">No messages found</p>
        </div>
      ) : (
        filteredMessages.map((msg) => {
          const isUser = msg.senderType === "user"
          const isAi = msg.senderType === "ai"

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3.5 group/msg ${isUser ? "flex-row-reverse" : "flex-row"
                }`}
            >
              {/* Sender Avatar */}
              {isUser ? (
                <Avatar size="default" className="shadow-xs bg-indigo-600 ring-2 ring-indigo-500/20">
                  <AvatarFallback className="bg-indigo-600 text-white font-semibold text-xs">
                    {msg.sender.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : isAi ? (
                <Avatar size="default" className="bg-amber-500/10 border-2 border-amber-500/20 text-amber-500 font-bold shrink-0">
                  <AvatarFallback className="bg-amber-500/15 text-amber-500 font-semibold text-xs flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar size="default" className="shrink-0 ring-2 ring-zinc-200/30">
                  <AvatarImage src={msg.avatar} alt={msg.sender} />
                  <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-xs">
                    {msg.sender.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}

              {/* Message Bubble Container */}
              <div className={`flex flex-col max-w-[80%] md:max-w-[70%] ${isUser ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    {isUser ? "You" : msg.sender}
                  </span>
                  {isAi && (
                    <span className="px-1 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
                      AI
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{msg.timestamp}</span>
                </div>

                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-xs ${isUser
                      ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-tr-none"
                      : isAi
                        ? "bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/15 text-zinc-800 dark:text-zinc-100 rounded-tl-none"
                        : "bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200/30 dark:border-zinc-700/20 text-zinc-800 dark:text-zinc-200 rounded-tl-none"
                    }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          )
        })
      )}

      <div ref={messagesEndRef} />
    </main>
  )
}
