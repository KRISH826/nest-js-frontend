"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Message } from "@/types/chat"
import { INITIAL_MESSAGES } from "@/lib/mock-chat"
import { NamePromptDialog } from "@/components/chat/NamePromptDialog"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { MessageList } from "@/components/chat/MessageList"
import { ChatInput } from "@/components/chat/ChatInput"

export default function Home() {
  const [userName, setUserName] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Avoid hydration mismatch by waiting for client-side mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    const storedName = localStorage.getItem("chat-username")
    if (storedName) {
      setUserName(storedName)
      setIsDialogOpen(false)
    } else {
      setIsDialogOpen(true)
    }

    const savedTheme = localStorage.getItem("chat-theme") as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  // Sync theme to root HTML element
  useEffect(() => {
    if (!isMounted) return
    const root = window.document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("chat-theme", theme)
  }, [theme, isMounted])

  if (!isMounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <div className="text-zinc-400 flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <span className="text-sm font-medium tracking-wide">Initializing chat workspace...</span>
        </div>
      </div>
    )
  }

  const handleNameSubmit = (name: string) => {
    setUserName(name)
    localStorage.setItem("chat-username", name)
    setIsDialogOpen(false)
  }

  const handleSendMessage = (content: string) => {
    // Create user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: userName,
      senderType: "user",
      avatar: "",
      content: content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMsg])
  }

  const handleResetProfile = () => {
    localStorage.removeItem("chat-username")
    setUserName("")
    setMessages(INITIAL_MESSAGES)
    setIsDialogOpen(true)
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-0 sm:p-4 md:p-6 bg-gradient-to-br from-indigo-50/50 via-zinc-100 to-indigo-100/50 dark:from-zinc-950 dark:via-zinc-900/40 dark:to-black transition-colors duration-300">

      {/* Background visual embellishment */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Chat Panel */}
      <div className="relative w-full max-w-5xl h-full sm:h-[85vh] sm:max-h-[800px] flex flex-col rounded-none sm:rounded-2xl border bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border-zinc-200/50 dark:border-zinc-800/40 shadow-2xl overflow-hidden z-10">

        {/* Header Component */}
        <ChatHeader
          userName={userName}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          onThemeToggle={toggleTheme}
          onResetProfile={handleResetProfile}
        />

        {/* Message Logs Component */}
        <MessageList
          userName={userName}
          messages={messages}
          searchQuery={searchQuery}
        />

        {/* Footer Input Bar Component */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={false}
        />
      </div>

      {/* Username Prompter Dialog component */}
      <NamePromptDialog
        isOpen={isDialogOpen}
        onNameSubmit={handleNameSubmit}
      />
    </div>
  )
}


