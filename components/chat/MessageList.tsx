"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Message } from "@/types/chat"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bot,
  Sparkles,
  HelpCircle,
  Reply,
  CheckCheck,
  Download,
  FileCode,
  SmilePlus,
  MoreHorizontal
} from "lucide-react"

// Extend standard Message type for high fidelity visuals
interface ExtendedMessage extends Message {
  reactions?: { emoji: string; count: number }[]
  attachment?: {
    type: "image" | "file"
    name: string
    size: string
    url?: string
  }
  replyTo?: { senderName: string; text: string }
}

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
    <main className="flex-1 overflow-y-auto px-6 py-6 space-y-5 bg-slate-50 dark:bg-zinc-950/20 scrollbar-thin relative">
      {/* Workspace Welcome Banner */}
      <div className="flex justify-center my-2">
        <span className="text-[11px] font-semibold tracking-wider text-slate-400 dark:text-zinc-500 bg-slate-200/50 dark:bg-zinc-900/60 px-3.5 py-1 rounded-full uppercase select-none">
          Secured workspace channel | {roomName}
        </span>
      </div>

      {searchQuery && (
        <div className="text-xs text-zinc-400 dark:text-zinc-500 italic pb-2 border-b border-zinc-200/20 dark:border-zinc-800/20">
          Showing search results matching &quot;{searchQuery}&quot; ({filteredMessages.length} found)
        </div>
      )}

      {filteredMessages.length === 0 ? (
        <div className="h-48 flex flex-col items-center justify-center text-center gap-2">
          <HelpCircle className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
          <p className="text-sm font-medium text-zinc-400 dark:text-zinc-500">No messages found</p>
        </div>
      ) : (
        filteredMessages.map((msg: ExtendedMessage) => {
          const isUser = msg.senderType === "user" || msg.sender === userName
          const isAi = msg.senderType === "ai" || msg.sender.toLowerCase().includes("ai")
          
          // Combine mock reactions with local interactive reactions
          const localReactions = messageReactions[msg.id] || []
          const mockReactions = msg.reactions || []
          const allReactions = [...mockReactions]
          
          // Merge local reactions into display list
          localReactions.forEach(local => {
            const found = allReactions.find(r => r.emoji === local.emoji)
            if (found) {
              found.count = local.count
            } else {
              allReactions.push({ emoji: local.emoji, count: local.count })
            }
          })

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
                  <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 font-semibold text-xs flex items-center justify-center">
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
                  {isAi && (
                    <span className="px-1 py-0.25 text-[8px] font-bold bg-amber-500/10 text-amber-550 border border-amber-500/20 rounded">
                      AI
                    </span>
                  )}
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-550">{msg.timestamp}</span>
                </div>

                <div className="relative group/bubble flex items-center">
                  {/* Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm text-sm break-words transition-all ${
                      isUser
                        ? "bg-indigo-650 text-white rounded-tr-none"
                        : "bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-slate-200/40 dark:border-zinc-800/60 rounded-tl-none hover:bg-slate-50/50 dark:hover:bg-zinc-900/90"
                    }`}
                  >
                    {/* If message is a reply to another message */}
                    {msg.replyTo && (
                      <div className="mb-2 pl-2.5 border-l-2 border-indigo-400 bg-slate-100/80 dark:bg-zinc-800/80 text-[11px] py-1 px-1.5 rounded text-slate-500 dark:text-zinc-400 italic">
                        <span className="font-bold not-italic block mb-0.5 text-slate-650 dark:text-zinc-300">
                          {msg.replyTo.senderName}
                        </span>
                        {msg.replyTo.text}
                      </div>
                    )}

                    <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                    {/* Image Attachment Rendering */}
                    {msg.attachment?.type === "image" && (
                      <div className="mt-2.5 rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-850">
                        <img
                          src={msg.attachment.url}
                          alt={msg.attachment.name}
                          className="max-h-60 w-full object-cover hover:scale-102 transition-transform duration-350 cursor-pointer"
                        />
                      </div>
                    )}

                    {/* File Attachment Rendering */}
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

                    {/* Timestamp ticks */}
                    <div className={`flex items-center justify-end gap-1 mt-1.5 text-[9px] ${
                      isUser ? "text-indigo-200" : "text-slate-450 dark:text-zinc-500"
                    }`}>
                      <span>{msg.timestamp.includes(" ") ? msg.timestamp.split(" ").slice(-2).join(" ") : msg.timestamp}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-indigo-300" />}
                    </div>
                  </div>

                  {/* Micro Reactions Popup Toolbar on Hover */}
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
                    <button className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 p-0.5 cursor-pointer">
                      <SmilePlus className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 p-0.5 cursor-pointer">
                      <Reply className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 p-0.5 cursor-pointer">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Reaction Display Badges */}
                {allReactions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5 px-1">
                    {allReactions.map((react, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddReaction(msg.id, react.emoji)}
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
