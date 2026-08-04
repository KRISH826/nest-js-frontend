"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Message, ChatRoom, SenderType } from "@/types/chat"
import { NamePromptDialog } from "@/components/chat/NamePromptDialog"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { MessageList } from "@/components/chat/MessageList"
import { ChatInput } from "@/components/chat/ChatInput"
import { ChatSidebar } from "@/components/chat/ChatSidebar"
import ChatDialogue from "@/components/chat/ChatDialogue"
import { useChatMessages } from "@/hooks/useChatMessage"
import { RESPONDERS } from "@/lib/mock-chat"

export default function Home() {
  const [userName, setUserName] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Active chat state
  const [activeRoomId, setActiveRoomId] = useState<string>("general")
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true) // true shows list on mobile

  // Typist simulation state
  const [typingState, setTypingState] = useState<{ isTyping: boolean; userName?: string }>({
    isTyping: false,
  })

  // Hook for the real-time General socket chat
  const { messages: socketMessages, sendMessage: sendSocketMessage } = useChatMessages(userName)

  // Rooms configuration state (only channels, no direct messages)
  const [rooms, setRooms] = useState<ChatRoom[]>([
    {
      id: "general",
      name: "General Workspace",
      type: "channel",
      lastMessage: "Welcome to Aether Workspace! Real-time sockets enabled.",
      timestamp: "10:26 AM",
      unreadCount: 0,
      description: "Main workspace communication room, powered by real-time WebSocket connection to the NestJS backend.",
      membersCount: 3,
    },
    {
      id: "design-sync",
      name: "design-system",
      type: "channel",
      lastMessage: "Should we use glassmorphism for the popups?",
      timestamp: "Yesterday",
      unreadCount: 2,
      description: "Dedicated to UI components, visual designs, theme styling, and brand systems discussions.",
      membersCount: 3,
    },
    {
      id: "marketing-campaign",
      name: "marketing-dev",
      type: "channel",
      lastMessage: "Sarah: The copy sheets are ready in Google Drive.",
      timestamp: "Aug 02",
      unreadCount: 0,
      description: "Discuss campaigns, analytics, brand marketing strategies, and content distribution plans.",
      membersCount: 3,
    },
  ])

  // Mock message archives for the local channels
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>({
    "design-sync": [
      {
        id: "ds1",
        sender: "Sarah Jenkins",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        content: "Hey team! Let's build out the design tokens. I've designed some templates.",
        timestamp: "09:12 AM",
      },
      {
        id: "ds2",
        sender: "Alex Rivers",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        content: "Awesome, the color-mix setup in Tailwind v4 is extremely elegant. I've mapped the colors.",
        timestamp: "09:15 AM",
      },
      {
        id: "ds3",
        sender: "Sarah Jenkins",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        content: "Should we use glassmorphism for the popups?",
        timestamp: "Yesterday",
      },
    ],
    "marketing-campaign": [
      {
        id: "m1",
        sender: "Alex Rivers",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        content: "Are the marketing copy sheets finalized yet? We need to draft the release posts.",
        timestamp: "Aug 02",
      },
      {
        id: "m2",
        sender: "Sarah Jenkins",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        content: "Yes, they are in the shared Drive folder. I will add the links to details pane.",
        timestamp: "Aug 02",
      },
    ],
  })

  // Avoid hydration mismatch by waiting for client-side mount
  useEffect(() => {
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
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    
    if (activeRoomId === "general") {
      // General is connected to real-time socket
      sendSocketMessage(content)
      
      // Update sidebar preview for General
      setRooms((prev) =>
        prev.map((r) =>
          r.id === "general"
            ? { ...r, lastMessage: content, timestamp }
            : r
        )
      )
    } else {
      // Local group chat
      const userMsg: Message = {
        id: Date.now().toString(),
        sender: userName,
        senderType: "user",
        content: content,
        timestamp,
      }

      setLocalMessages((prev) => ({
        ...prev,
        [activeRoomId]: [...(prev[activeRoomId] || []), userMsg],
      }))

      // Update sidebar preview
      setRooms((prev) =>
        prev.map((r) =>
          r.id === activeRoomId
            ? { ...r, lastMessage: content, timestamp }
            : r
        )
      )

      // Trigger automatic mock response with a typing animation
      const activeRoom = rooms.find((r) => r.id === activeRoomId)
      if (!activeRoom) return

      setTypingState({ isTyping: true, userName: activeRoom.name })

      setTimeout(() => {
        // Channels pull random replies from Sarah or Alex
        const eligibleResponders = RESPONDERS.filter(r => r.name !== "Aether AI")
        const responder = eligibleResponders[Math.floor(Math.random() * eligibleResponders.length)]

        const templates = responder.templates
        const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
        const replyText = randomTemplate.replace("{name}", userName)
        const responseTimestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

        const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: responder.name,
          senderType: "other",
          avatar: responder.avatar,
          content: replyText,
          timestamp: responseTimestamp,
        }

        setLocalMessages((prev) => ({
          ...prev,
          [activeRoomId]: [...(prev[activeRoomId] || []), replyMsg],
        }))

        // Update sidebar preview
        setRooms((prev) =>
          prev.map((r) =>
            r.id === activeRoomId
              ? { ...r, lastMessage: replyText, timestamp: responseTimestamp }
              : r
          )
        )

        setTypingState({ isTyping: false })
      }, 1500)
    }
  }

  const handleResetProfile = () => {
    localStorage.removeItem("chat-username")
    setUserName("")
    setIsDialogOpen(true)
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const handleSelectRoom = (roomId: string) => {
    setActiveRoomId(roomId)
    // Clear unread count when switching into a room
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    )
    setIsSidebarOpen(false) // On mobile: hide sidebar and show chat view
  }

  // Get configuration of current active room
  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0]
  
  // Choose which message list to display
  const activeMessages = activeRoomId === "general" ? socketMessages : (localMessages[activeRoomId] || [])

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center p-0 sm:p-4 md:p-6 bg-gradient-to-br from-indigo-50/50 via-zinc-100 to-indigo-100/50 dark:from-zinc-950 dark:via-zinc-900/40 dark:to-black transition-colors duration-300 overflow-hidden">
      
      {/* Background visual graphics */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Layout panel */}
      <div className="relative w-full max-w-6xl h-full sm:h-[88vh] sm:max-h-[820px] flex flex-row rounded-none sm:rounded-2xl border bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border-zinc-200/50 dark:border-zinc-800/40 shadow-2xl overflow-hidden z-10">
        
        {/* Chat Sidebar Listing */}
        <div className={`${isSidebarOpen ? "flex w-full" : "hidden"} md:flex md:w-auto shrink-0 h-full`}>
          <ChatSidebar
            rooms={rooms}
            activeRoomId={activeRoomId}
            onSelectRoom={handleSelectRoom}
            userName={userName}
            onCreateRoomClick={() => setIsCreateRoomOpen(true)}
          />
        </div>

        {/* Active Chat Conversation Container */}
        <div className={`flex-1 flex flex-col h-full overflow-hidden ${isSidebarOpen ? "hidden md:flex" : "flex"}`}>
          {/* Header Panel */}
          <ChatHeader
            roomName={activeRoom.name}
            isDm={false}
            membersCount={activeRoom.membersCount}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            theme={theme}
            onThemeToggle={toggleTheme}
            onResetProfile={handleResetProfile}
            onToggleSidebar={() => setIsSidebarOpen(true)} // Back button on mobile
          />

          {/* Messages Stream */}
          <MessageList
            userName={userName}
            messages={activeMessages}
            searchQuery={searchQuery}
            isTyping={typingState.isTyping}
            typingUserName={typingState.userName}
            roomName={activeRoom.name}
          />

          {/* Form message input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={false}
          />
        </div>
      </div>

      {/* Username prompt dialog on first load */}
      <NamePromptDialog
        isOpen={isDialogOpen}
        onNameSubmit={handleNameSubmit}
      />

      {/* Create chat room dialog */}
      <ChatDialogue
        isOpen={isCreateRoomOpen}
        onClose={() => setIsCreateRoomOpen(false)}
      />
    </div>
  )
}
