"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Chat } from "@/types/chat";
import { useGetRoomMessagesQuery } from "@/lib/api/chat/chatApi";
import { useGetProfileQuery } from "@/lib/api/auth/authApi";

interface MessageListProps {
  roomId: string;
  liveMessages: Chat[];
}

export function MessageList({ roomId, liveMessages }: MessageListProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // 1. Fetch historical data from NestJS ChatController
  const { data: response, isLoading } = useGetRoomMessagesQuery(
    { chatRoomId: roomId },
    { skip: !roomId }
  );

  const { data: userProfileData } = useGetProfileQuery()
  const currentUserId = userProfileData?.data._id

  const allMessages = React.useMemo(() => {
    const historical = response?.data || [];
    const map = new Map<string, Chat>();

    // Add historical messages
    historical.forEach((msg) => map.set(msg._id, msg));

    // Append/merge live socket messages
    liveMessages.forEach((msg) => {
      if (msg.chatRoom === roomId) {
        map.set(msg._id, msg);
      }
    });

    return Array.from(map.values());
  }, [response?.data, liveMessages, roomId]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allMessages]);

  return (
    <main className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-slate-50 dark:bg-zinc-950/20 scrollbar-thin">
      {allMessages.map((msg) => {
        const senderId = typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
        const isUser = Boolean(currentUserId && senderId === currentUserId);
        const senderName =
          typeof msg.sender === "string"
            ? msg.sender
            : `${msg.sender?.fname || ""} ${msg.sender?.lname || ""}`.trim() || msg.sender?.email || "Unknown";
        const avatarUrl = typeof msg.sender === "object" ? msg.sender?.avatar?.url : undefined;
        const formattedTime = msg.createdAt
          ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "";

        return (
          <div
            key={msg._id}
            className={`flex items-start gap-3 max-w-[80%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
          >
            {/* Sender Avatar */}
            {!isUser && (
              <Avatar className="h-9 w-9 shrink-0 select-none mt-0.5 animate-in fade-in duration-200">
                <AvatarImage src={avatarUrl} alt={senderName} className="object-cover" />
                <AvatarFallback className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold text-xs flex items-center justify-center">
                  {senderName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}

            {/* Bubble */}
            <div className="flex flex-col">
              <div className={`flex items-center gap-1.5 mb-0.5 px-1 select-none ${isUser ? "justify-end" : "justify-start"}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-zinc-450">
                  {isUser ? "You" : senderName}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-550">{formattedTime}</span>
              </div>

              <div
                className={`px-4 py-2.5 rounded-2xl shadow-xs text-xs sm:text-sm break-words leading-relaxed animate-in zoom-in-95 duration-150 ${isUser
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border border-slate-200/40 dark:border-zinc-800/60 rounded-tl-none"
                  }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        )
      })}
    </main>
  )
}
