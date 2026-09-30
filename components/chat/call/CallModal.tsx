"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
  PhoneOff
} from "lucide-react"

interface CallModalProps {
  isOpen: boolean
  onClose: () => void
  roomName?: string
  avatarUrl?: string
  callType?: "audio" | "video"
}

export function CallModal({
  isOpen,
  onClose,
  roomName = "Design System Room",
  avatarUrl,
  callType = "audio"
}: CallModalProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(callType === "audio")
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const [callState, setCallState] = useState<"connecting" | "connected">("connecting")

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0)
      setCallState("connecting")
      return
    }

    const timer = setTimeout(() => {
      setCallState("connected")
    }, 2000)

    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (callState !== "connected" || !isOpen) return

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [callState, isOpen])

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0")
    const secs = (totalSeconds % 60).toString().padStart(2, "0")
    return `${mins}:${secs}`
  }

  const initials = roomName ? roomName.trim().substring(0, 2).toUpperCase() : "CS"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-sm w-full p-6 bg-white/95 dark:bg-zinc-950/95 text-slate-900 dark:text-zinc-100 border border-slate-200/80 dark:border-zinc-800/80 shadow-2xl rounded-2xl backdrop-blur-xl transition-all duration-300 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95"
      >
        <div className="flex flex-col items-center justify-between min-h-[340px]">
          {/* Header Info */}
          <DialogHeader className="items-center text-center space-y-1.5 w-full">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/50">
              {callType === "video" ? "Video Call" : "Voice Call"}
            </span>

            <DialogTitle className="text-lg font-bold tracking-tight text-slate-900 dark:text-zinc-100">
              {roomName}
            </DialogTitle>

            <DialogDescription className="text-xs font-mono text-slate-500 dark:text-zinc-400 flex items-center justify-center gap-1.5">
              {callState === "connecting" ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Calling...</span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    Connected • {formatTimer(seconds)}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Central Avatar Visualizer */}
          <div className="relative my-6 flex items-center justify-center">
            {callState === "connecting" && (
              <>
                <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md animate-pulse" />
                <div className="absolute -inset-2 rounded-full border border-indigo-500/30 animate-ping opacity-50 duration-1000" />
              </>
            )}

            <Avatar className="h-24 w-24 rounded-full border-2 border-slate-200 dark:border-zinc-800 shadow-xl relative z-10 transition-transform duration-300 hover:scale-105">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={roomName} className="object-cover" />
              ) : null}
              <AvatarFallback className="bg-indigo-600 text-white font-bold text-xl flex items-center justify-center">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Call Controls Bar */}
          <div className="flex items-center justify-center gap-3.5 w-full pt-4 border-t border-slate-100 dark:border-zinc-800/80">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className={`h-11 w-11 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${isMuted
                  ? "bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50"
                  : "bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800"
                }`}
              title={isMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {isMuted ? <MicOff className="w-4.5 h-4.5" /> : <Mic className="w-4.5 h-4.5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`h-11 w-11 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${isVideoOff
                  ? "bg-slate-100 dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 border border-slate-200 dark:border-zinc-800"
                  : "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/50"
                }`}
              title={isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
            >
              {isVideoOff ? <VideoOff className="w-4.5 h-4.5" /> : <Video className="w-4.5 h-4.5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSpeakerOn(!isSpeakerOn)}
              className={`h-11 w-11 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${!isSpeakerOn
                  ? "bg-slate-100 dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 border border-slate-200 dark:border-zinc-800"
                  : "bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800"
                }`}
              title={isSpeakerOn ? "Speaker Mute" : "Speaker On"}
            >
              {!isSpeakerOn ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-11 w-11 rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/30 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
              title="End Call"
            >
              <PhoneOff className="w-4.5 h-4.5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
