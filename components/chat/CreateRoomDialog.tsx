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
import { Globe, Lock } from "lucide-react"

interface CreateRoomDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateRoomDialog({ isOpen, onClose }: CreateRoomDialogProps) {
  const [newRoomName, setNewRoomName] = useState("")
  const [newRoomDesc, setNewRoomDesc] = useState("")
  const [privacy, setPrivacy] = useState<"public" | "private">("public")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Statically reset and close
    setNewRoomName("")
    setNewRoomDesc("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent 
        className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/95 backdrop-blur-lg max-w-md rounded-2xl p-6 shadow-2xl text-slate-800 dark:text-zinc-100"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-lg font-bold text-slate-905 dark:text-zinc-50">
            Create a channel
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Channels are where your team communicates. They’re best when organized around a topic (e.g., marketing-sync or design-tokens).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          {/* Channel Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-350">
              Channel name
            </label>
            <Input
              type="text"
              placeholder="e.g. marketing-dev"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="bg-slate-50 dark:bg-zinc-950/40 border-slate-200 dark:border-zinc-800 focus-visible:ring-indigo-500 h-10"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-350">
              Description <span className="text-[10px] text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="What's this channel about?"
              value={newRoomDesc}
              onChange={(e) => setNewRoomDesc(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-lg text-sm transition-all resize-none text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-500"
            />
          </div>

          {/* Privacy Settings Card Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-350 block">
              Privacy
            </label>
            
            {/* Public Option Card */}
            <div 
              onClick={() => setPrivacy("public")}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                privacy === "public" 
                  ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/5" 
                  : "border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-850"
              }`}
            >
              <div className="p-1 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 rounded-lg flex-shrink-0 mt-0.5">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold">Standard</p>
                <p className="text-[10px] text-slate-450 dark:text-zinc-400 mt-0.5 leading-normal">Everyone on the team has access to this channel.</p>
              </div>
            </div>

            {/* Private Option Card */}
            <div 
              onClick={() => setPrivacy("private")}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                privacy === "private" 
                  ? "border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/5" 
                  : "border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-850"
              }`}
            >
              <div className="p-1 bg-slate-100 dark:bg-zinc-800 text-slate-650 dark:text-zinc-400 rounded-lg flex-shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold">Private</p>
                <p className="text-[10px] text-slate-455 dark:text-zinc-400 mt-0.5 leading-normal">Only specific people will have access to this channel.</p>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="flex items-center justify-end gap-2 pt-2.5 border-t border-slate-100 dark:border-zinc-800/60 mt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-xs font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer h-9 px-4"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-550 text-white rounded-xl shadow-md cursor-pointer h-9 px-4"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
