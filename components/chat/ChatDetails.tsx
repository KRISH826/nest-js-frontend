"use client"

import * as React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChatRoom } from "@/types/chat"
import {
  X,
  Users,
  Pin,
  Link2,
  FileText,
  Bell,
  Trash2,
  Sparkles,
  Info,
} from "lucide-react"

interface ChatDetailsProps {
  room: ChatRoom | undefined
  onClose: () => void
  members: { name: string; role: string; avatar?: string; status?: string }[]
}

export function ChatDetails({ room, onClose, members }: ChatDetailsProps) {
  if (!room) return null

  const isDm = room.type === "dm"
  const isAi = room.name.toLowerCase().includes("ai")

  // Mock data for files & links
  const mockSharedFiles = [
    { name: "Project_Proposal.pdf", size: "2.4 MB", date: "Jul 28", type: "pdf" },
    { name: "LandingPageMockup.png", size: "4.8 MB", date: "Aug 02", type: "image" },
    { name: "SystemArchitecture.vsdx", size: "1.1 MB", date: "Yesterday", type: "doc" },
  ]

  const mockSharedLinks = [
    { title: "Figma Designs", url: "figma.com/file/aether-workspace", date: "Jul 24" },
    { title: "GitHub Repository", url: "github.com/aether-core", date: "Jul 26" },
  ]

  const mockPinnedMessages = [
    { sender: "Sarah Jenkins", content: "Let's push the new glassmorphic UI update by Friday afternoon.", date: "Aug 01" },
  ]

  return (
    <aside className="w-full md:w-80 h-full flex flex-col border-l border-zinc-200/50 dark:border-zinc-800/40 bg-zinc-50/50 dark:bg-zinc-950/20 backdrop-blur-xs select-none">
      {/* Header */}
      <div className="p-4 border-b border-zinc-200/50 dark:border-zinc-800/40 flex items-center justify-between">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Info className="w-4.5 h-4.5 text-zinc-500" />
          <span>Details</span>
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-fade">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center pb-4 border-b border-zinc-200/40 dark:border-zinc-800/20">
          <div className="relative mb-3">
            <Avatar className="h-20 w-20 ring-4 ring-indigo-500/10">
              {isDm ? (
                <>
                  <AvatarImage src={room.avatar} alt={room.name} />
                  <AvatarFallback className="bg-zinc-200 dark:bg-zinc-850 text-zinc-650 text-xl font-bold">
                    {room.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </>
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-xl">
                  {room.id === "general" ? "✨" : "#"}
                </AvatarFallback>
              )}
            </Avatar>
            {isDm && (
              <span
                className={`absolute bottom-0 right-1 w-4 h-4 rounded-full border-4 border-zinc-50 dark:border-zinc-950 ${
                  room.status === "online"
                    ? "bg-emerald-500"
                    : room.status === "idle"
                    ? "bg-amber-500"
                    : room.status === "dnd"
                    ? "bg-rose-500"
                    : "bg-zinc-400"
                }`}
              />
            )}
          </div>

          <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5 justify-center">
            <span>{room.name}</span>
            {isAi && (
              <span className="px-1 py-0.5 text-[9px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/20 rounded">
                AI
              </span>
            )}
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-[200px]">
            {isDm
              ? isAi
                ? "Autonomous workspace intelligence chatbot."
                : "Product Designer & Frontend Developer"
              : room.description || "No description set for this group."}
          </p>
        </div>

        {/* Quick Settings */}
        <div className="space-y-1.5">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-150/60 dark:hover:bg-zinc-900/50 cursor-pointer">
            <span className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-zinc-550" />
              <span>Mute Notifications</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-medium">Off</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-semibold text-rose-500 hover:bg-rose-500/10 cursor-pointer">
            <Trash2 className="w-4 h-4" />
            <span>Clear Chat History</span>
          </button>
        </div>

        {/* Section: Members list (Only for Channels / Groups) */}
        {!isDm && (
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-between">
              <span>Channel Members ({members.length})</span>
              <Users className="w-3.5 h-3.5" />
            </h5>
            <div className="space-y-2">
              {members.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-7 w-7 ring-1 ring-zinc-200/20">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-[10px] font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-zinc-850 dark:text-zinc-200 leading-tight">
                        {member.name}
                      </span>
                      <span className="text-[9px] text-zinc-505 dark:text-zinc-500 leading-none mt-0.5">
                        {member.role}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.status === "online"
                        ? "bg-emerald-500"
                        : member.status === "idle"
                        ? "bg-amber-500"
                        : member.status === "dnd"
                        ? "bg-rose-500"
                        : "bg-zinc-400"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Pinned Messages */}
        <div className="space-y-3">
          <h5 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-between">
            <span>Pinned Items</span>
            <Pin className="w-3.5 h-3.5 rotate-45" />
          </h5>
          <div className="space-y-2">
            {mockPinnedMessages.map((pin, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/40 text-[11px] space-y-1 shadow-xs"
              >
                <div className="flex justify-between items-center text-[10px] font-bold text-zinc-500 dark:text-zinc-455">
                  <span>{pin.sender}</span>
                  <span>{pin.date}</span>
                </div>
                <p className="text-zinc-650 dark:text-zinc-350 leading-relaxed italic">&quot;{pin.content}&quot;</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Shared Documents */}
        <div className="space-y-3">
          <h5 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-between">
            <span>Shared Files</span>
            <FileText className="w-3.5 h-3.5" />
          </h5>
          <div className="space-y-2">
            {mockSharedFiles.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-zinc-200/40 dark:hover:bg-zinc-900/40 cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-550 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate leading-tight">
                      {file.name}
                    </span>
                    <span className="text-[9px] text-zinc-500 dark:text-zinc-500 mt-0.5">
                      {file.size} • {file.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Shared Links */}
        <div className="space-y-3">
          <h5 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center justify-between">
            <span>Shared Links</span>
            <Link2 className="w-3.5 h-3.5" />
          </h5>
          <div className="space-y-2">
            {mockSharedLinks.map((link, idx) => (
              <a
                key={idx}
                href={`https://${link.url}`}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col p-2.5 rounded-xl hover:bg-zinc-200/40 dark:hover:bg-zinc-900/40 cursor-pointer"
              >
                <span className="text-[11px] font-bold text-indigo-555 dark:text-indigo-400 leading-tight">
                  {link.title}
                </span>
                <span className="text-[9px] text-zinc-500 dark:text-zinc-500 truncate mt-0.5">
                  {link.url}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
