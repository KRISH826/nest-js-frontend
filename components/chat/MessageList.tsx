"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Message } from "@/types/chat"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Bot,
  Sparkles,
  HelpCircle,
  Smile,
  Heart,
  ThumbsUp,
  Flame,
  Laugh,
  MoreHorizontal,
  Reply,
} from "lucide-react"

interface MessageListProps {
  userName: string
  messages: Message[]
  searchQuery: string
  isTyping?: boolean
  typingUserName?: string
  roomName: string
}

interface Reaction {
  emoji: string
  count: number
  users: string[]
}

export function MessageList({
  userName,
  messages,
  searchQuery,
  isTyping,
  typingUserName,
  roomName,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Track reactions locally per message ID for premium visual feedback
  const [messageReactions, setMessageReactions] = useState<Record<string, Reaction[]>>({})

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Filter messages based on search query
  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessageReactions((prev) => {
      const current = prev[messageId] || []
      const existing = current.find((r) => r.emoji === emoji)

      let updated: Reaction[]
      if (existing) {
        if (existing.users.includes(userName)) {
          // Remove reaction if clicked again
          const users = existing.users.filter((u) => u !== userName)
          if (users.length === 0) {
            updated = current.filter((r) => r.emoji !== emoji)
          } else {
            updated = current.map((r) =>
              r.emoji === emoji ? { ...r, count: r.count - 1, users } : r
            )
          }
        } else {
          // Add user to reaction
          updated = current.map((r) =>
            r.emoji === emoji
              ? { ...r, count: r.count + 1, users: [...r.users, userName] }
              : r
          )
        }
      } else {
        // Create new reaction
        updated = [...current, { emoji, count: 1, users: [userName] }]
      }

      return { ...prev, [messageId]: updated }
    })
  }

  const defaultReactionEmojis = ["👍", "❤️", "🔥", "😂", "🎉"]

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-zinc-50/15 dark:bg-zinc-950/10 scrollbar-fade relative">
      {/* Workspace Welcome Banner */}
      <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex gap-3.5 mb-2 items-start animate-in fade-in slide-in-from-top-2 duration-300">
        <div className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shrink-0">
          <Sparkles className="w-4.5 h-4.5" />
        </div>
        <div>
          <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            {roomName} Workspace
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
            Welcome to the general channel. Chat, build layout prototypes, and test collaborative group features!
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
          <p className="text-sm font-medium text-zinc-400 dark:text-zinc-655">No messages found</p>
        </div>
      ) : (
        filteredMessages.map((msg) => {
          const isUser = msg.senderType === "user" || msg.sender === userName
          const isAi = msg.senderType === "ai"
          const reactions = messageReactions[msg.id] || []

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3.5 group/msg ${
                isUser ? "flex-row-reverse" : "flex-row"
              } animate-in fade-in duration-200`}
            >
              {/* Sender Avatar */}
              {isUser ? (
                <Avatar className="shadow-xs h-9 w-9 bg-indigo-600 ring-2 ring-indigo-500/20 select-none">
                  <AvatarFallback className="bg-indigo-650 text-white font-semibold text-xs">
                    {msg.sender.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : isAi ? (
                <Avatar className="h-9 w-9 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold shrink-0 select-none">
                  <AvatarFallback className="bg-amber-500/15 text-amber-500 font-semibold text-xs flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-9 w-9 shrink-0 ring-2 ring-zinc-200/20 select-none">
                  <AvatarImage src={msg.avatar} alt={msg.sender} />
                  <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 font-semibold text-xs">
                    {msg.sender.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}

              {/* Message Bubble Container */}
              <div className={`flex flex-col max-w-[80%] md:max-w-[70%] relative ${isUser ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-1.5 mb-1 px-1 select-none">
                  <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                    {isUser ? "You" : msg.sender}
                  </span>
                  {isAi && (
                    <span className="px-1 py-0.25 text-[8px] font-extrabold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
                      AI
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-550">{msg.timestamp}</span>
                </div>

                <div className="relative group/bubble flex items-center">
                  {/* Bubble */}
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isUser
                        ? "bg-indigo-650 text-white rounded-tr-none"
                        : isAi
                        ? "bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/15 text-zinc-800 dark:text-zinc-100 rounded-tl-none"
                        : "bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/30 dark:border-zinc-800/30 text-zinc-850 dark:text-zinc-200 rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Reaction Popup Toolbar on Hover */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex items-center gap-1 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 px-1.5 py-1 rounded-full shadow-lg z-25 ${
                      isUser ? "right-full mr-2" : "left-full ml-2"
                    }`}
                  >
                    {defaultReactionEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleAddReaction(msg.id, emoji)}
                        className="text-xs hover:scale-130 transition-transform duration-100 cursor-pointer p-0.5"
                      >
                        {emoji}
                      </button>
                    ))}
                    <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />
                    <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5 cursor-pointer">
                      <Reply className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Reaction Display Badges */}
                {reactions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5 px-1">
                    {reactions.map((react, idx) => {
                      const userReacted = react.users.includes(userName)
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAddReaction(msg.id, react.emoji)}
                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] border transition-all ${
                            userReacted
                              ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-650 dark:text-indigo-400 font-semibold"
                              : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200/50 dark:border-zinc-800/40 text-zinc-600 dark:text-zinc-400"
                          } hover:border-indigo-400 cursor-pointer`}
                          title={`Reacted by: ${react.users.join(", ")}`}
                        >
                          <span>{react.emoji}</span>
                          <span>{react.count}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })
      )}

      {/* Live typing indicator */}
      {isTyping && typingUserName && (
        <div className="flex items-center gap-2 px-1 text-xs text-zinc-500 dark:text-zinc-400 italic animate-pulse">
          <div className="flex space-x-1 items-center h-4 py-1.5 shrink-0">
            <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-650 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-650 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-650 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <span>{typingUserName} is typing...</span>
        </div>
      )}

      <div ref={messagesEndRef} />
    </main>
  )
}
