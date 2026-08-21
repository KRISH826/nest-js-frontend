"use client"

import { useState, useEffect, useSyncExternalStore, useCallback } from "react"
import { Message, ChatRoom } from "@/types/chat"
import { useChatMessages } from "./useChatMessage"

const emptySubscribe = () => () => {}

// Extended Message type to support attachment and reactions inside local messages
interface LocalMessage extends Message {
  reactions?: { emoji: string; count: number }[]
  attachment?: {
    type: "image" | "file"
    name: string
    size: string
    url?: string
  }
  replyTo?: { senderName: string; text: string }
}

export function useChatState() {
  const [userName, setUserName] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false)
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activeRoomId, setActiveRoomId] = useState<string>("design-sync")
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const [showInfoPane, setShowInfoPane] = useState<boolean>(true)
  const [typingState, setTypingState] = useState<{ isTyping: boolean; userName?: string }>({ isTyping: false })

  const { messages: socketMessages, sendMessage: sendSocketMessage } = useChatMessages(userName)

  const [rooms, setRooms] = useState<ChatRoom[]>([
    {
      id: "general",
      name: "General Workspace",
      type: "channel",
      lastMessage: "Welcome to Aether Workspace! Sockets active.",
      timestamp: "10:26 AM",
      unreadCount: 0,
      status: "online",
      description: "WebSocket sync room.",
      membersCount: 3,
    },
    {
      id: "design-sync",
      name: "Design System & UI Sync",
      type: "channel",
      lastMessage: "Sarah: Check out the new glassmorphism CSS variables!",
      timestamp: "10:42 AM",
      unreadCount: 3,
      status: "online",
      description: "UX review channel.",
      membersCount: 8,
    },
    {
      id: "marketing-campaign",
      name: "Marketing Launch Strategy",
      type: "channel",
      lastMessage: "Alex: The spreadsheet is finalized.",
      timestamp: "Yesterday",
      unreadCount: 0,
      status: "offline",
      description: "Release campaigns.",
      membersCount: 4,
    }
  ])

  const [localMessages, setLocalMessages] = useState<Record<string, LocalMessage[]>>({
    "design-sync": [
      {
        id: "ds-m1",
        sender: "Sarah Jenkins",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        content: "Hey everyone! I completed the draft specifications for the Skype/Teams hybrid component layout.",
        timestamp: "Yesterday 4:15 PM",
        reactions: [{ emoji: "👍", count: 4 }, { emoji: "🎉", count: 2 }]
      },
      {
        id: "ds-m2",
        sender: "Alex Rivers",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        content: "Awesome Sarah! I can start translating these specs into Tailwind CSS v4 variables directly.",
        timestamp: "Yesterday 4:20 PM",
        replyTo: { senderName: "Sarah Jenkins", text: "Hey everyone! I completed the draft specifications..." }
      },
      {
        id: "ds-m3",
        sender: "Krishnendu Pramanik",
        senderType: "user",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        content: "Great progress. Can we make sure the borders are subtle? Like `slate-200/50` on light mode and `zinc-800/80` on dark mode.",
        timestamp: "Yesterday 5:02 PM"
      },
      {
        id: "ds-m4",
        sender: "Sarah Jenkins",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        content: "Absolutely! I have attached the asset pack containing the custom palette values and icon resources.",
        timestamp: "10:35 AM",
        attachment: {
          type: "file",
          name: "ui-design-spec-v2.pdf",
          size: "4.8 MB"
        }
      },
      {
        id: "ds-m5",
        sender: "Sarah Jenkins",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        content: "Check out the new glassmorphism CSS variables in the screenshot!",
        timestamp: "10:42 AM",
        attachment: {
          type: "image",
          name: "Glassmorphism Preview",
          size: "1.2 MB",
          url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600"
        }
      }
    ],
    "marketing-campaign": [
      {
        id: "mk-m1",
        sender: "Lisa Chen",
        senderType: "other",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
        content: "Did we confirm the budget metrics for the social campaign ads?",
        timestamp: "Yesterday 1:12 PM"
      }
    ]
  })

  useEffect(() => {
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
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    }
  }, [])

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

  const handleNameSubmit = useCallback((name: string) => {
    setUserName(name)
    localStorage.setItem("chat-username", name)
    setIsDialogOpen(false)
  }, [])

  const handleSendMessage = useCallback((content: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    if (activeRoomId === "general") {
      sendSocketMessage(content)
      setRooms((prev) =>
        prev.map((r) => (r.id === "general" ? { ...r, lastMessage: content, timestamp } : r))
      )
    } else {
      const userMsg: LocalMessage = {
        id: Date.now().toString(),
        sender: userName,
        senderType: "user",
        content,
        timestamp,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
      }

      setLocalMessages((prev) => ({
        ...prev,
        [activeRoomId]: [...(prev[activeRoomId] || []), userMsg],
      }))

      setRooms((prev) =>
        prev.map((r) => (r.id === activeRoomId ? { ...r, lastMessage: content, timestamp } : r))
      )

      // Auto response simulation
      setTypingState({ isTyping: true, userName: "Sarah Jenkins" })
      setTimeout(() => {
        const replyMsg: LocalMessage = {
          id: (Date.now() + 1).toString(),
          sender: "Sarah Jenkins",
          senderType: "other",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
          content: `Perfect! I've logged your notes regarding: "${content}". I will sync these changes in the project branch.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }

        setLocalMessages((prev) => ({
          ...prev,
          [activeRoomId]: [...(prev[activeRoomId] || []), replyMsg],
        }))

        setRooms((prev) =>
          prev.map((r) =>
            r.id === activeRoomId ? { ...r, lastMessage: replyMsg.content, timestamp: replyMsg.timestamp } : r
          )
        )
        setTypingState({ isTyping: false })
      }, 1500)
    }
  }, [activeRoomId, userName, sendSocketMessage])

  const handleResetProfile = useCallback(() => {
    localStorage.removeItem("chat-username")
    setUserName("")
    setIsDialogOpen(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }, [])

  const handleSelectRoom = useCallback((roomId: string) => {
    setActiveRoomId(roomId)
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: 0 } : r))
    )
    setIsSidebarOpen(false)
  }, [])

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0]
  const activeMessages = activeRoomId === "general" ? socketMessages : (localMessages[activeRoomId] || [])

  return {
    userName,
    isDialogOpen,
    isCreateRoomOpen,
    theme,
    searchQuery,
    activeRoomId,
    isSidebarOpen,
    showInfoPane,
    typingState,
    rooms,
    activeRoom,
    activeMessages,
    isMounted,
    setSearchQuery,
    setIsCreateRoomOpen,
    setTheme,
    setShowInfoPane,
    setIsSidebarOpen,
    handleNameSubmit,
    handleSendMessage,
    handleResetProfile,
    toggleTheme,
    handleSelectRoom
  }
}
