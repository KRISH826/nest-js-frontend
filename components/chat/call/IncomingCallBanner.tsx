"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, PhoneOff } from "lucide-react"

interface IncomingCallBannerProps {
  isOpen: boolean
  callerName?: string
  avatarUrl?: string
  callType?: "audio" | "video"
  onAccept: () => void
  onReject: () => void
}

export function IncomingCallBanner({
  isOpen,
  callerName = "Alex Rivera",
  avatarUrl,
  callType = "audio",
  onAccept,
  onReject
}: IncomingCallBannerProps) {
  const initials = callerName ? callerName.trim().substring(0, 2).toUpperCase() : "AR"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onReject()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-sm w-full p-6 bg-white/95 dark:bg-zinc-950/95 text-slate-900 dark:text-zinc-100 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xl rounded-2xl backdrop-blur-xl transition-all duration-300 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95"
      >
        <DialogHeader className="items-center text-center space-y-3">
          {/* Avatar with subtle breathing ring */}
          <div className="relative my-1 mt-10! flex items-center justify-center">
            {/* Elegant soft glowing aura */}
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 dark:bg-emerald-500/25 blur-md animate-pulse" />
            <div className="absolute -inset-1 rounded-full border border-emerald-500/40 animate-ping opacity-75 duration-1000" />
            <Avatar className="h-18 w-18 rounded-full border-2 border-emerald-500 shadow-md relative z-10 transition-transform duration-300 hover:scale-105">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={callerName} className="object-cover" />
              ) : null}
              <AvatarFallback className="bg-indigo-600 text-white font-bold text-lg flex items-center justify-center">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-1">
            <DialogTitle className="text-base font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              {callerName}
            </DialogTitle>

            <DialogDescription className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Incoming {callType === "video" ? "Video" : "Voice"} Call...</span>
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Action Buttons: Accept & Reject */}
        <DialogFooter className="flex flex-row items-center justify-center gap-3 sm:justify-center mt-5 w-full">
          {/* Decline / Reject */}
          <Button
            variant="ghost"
            onClick={onReject}
            className="flex-1 h-10 bg-rose-600 hover:bg-rose-700 text-white! font-semibold text-xs cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <PhoneOff className="w-4 h-4" />
            <span>Decline</span>
          </Button>

          {/* Accept */}
          <Button
            variant="ghost"
            onClick={onAccept}
            className="flex-1 h-10 bg-emerald-600 hover:bg-emerald-500 text-white! font-semibold text-xs cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Accept</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
