"use client"

import * as React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquareCode } from "lucide-react"
import { socket } from "@/lib/socket/ws"

interface NamePromptDialogProps {
  isOpen: boolean
  onNameSubmit: (name: string) => void
}

export function NamePromptDialog({ isOpen, onNameSubmit }: NamePromptDialogProps) {
  const [tempName, setTempName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = tempName.trim();
    if (trimmed.length >= 2) {
      socket.emit("joinRoom", trimmed)
      onNameSubmit(trimmed)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => { }}>
      <DialogContent
        className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-lg max-w-sm rounded-2xl p-6 shadow-2xl"
        showCloseButton={false}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="items-center text-center gap-1.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1">
            <MessageSquareCode className="w-6 h-6 animate-pulse" />
          </div>
          <DialogTitle className="text-xl font-heading font-bold text-zinc-900 dark:text-zinc-50">
            Join Aether Chat
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
            Please enter your name to unlock the workspace chat room.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your name..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              autoFocus
              required
              className="h-10 text-center text-sm font-medium bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500/30"
            />
            {tempName.trim().length > 0 && tempName.trim().length < 2 && (
              <p className="text-[10px] text-rose-500 font-medium text-center">Name must be at least 2 characters</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={tempName.trim().length < 2}
              className="w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-50 dark:text-indigo-950 dark:hover:bg-indigo-100 font-semibold h-10 rounded-xl cursor-pointer"
            >
              Enter Chat Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
