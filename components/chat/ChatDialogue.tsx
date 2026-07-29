"use client"

import React from 'react'
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
import { cn } from "@/lib/utils"

interface ChatDialogueProps {
    isOpen: boolean
    onClose: () => void
}

const ChatDialogue = ({ isOpen, onClose }: ChatDialogueProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
            <DialogContent className="max-w-106.25 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-heading font-bold text-zinc-900 dark:text-zinc-50">Create Chat Room</DialogTitle>
                    <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                        Fill in the details below to create a new workspace chat room.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-4 py-2">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Room Name</label>
                        <Input
                            type="text"
                            placeholder="e.g. Design Sync"
                            required
                            className="h-10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500/30"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</label>
                        <textarea
                            placeholder="What is this room about?"
                            rows={3}
                            className={cn(
                                "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-none",
                                "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500/30"
                            )}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Max Members Limit</label>
                        <Input
                            type="number"
                            placeholder="e.g. 10 (optional)"
                            min={1}
                            className="h-10 bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus-visible:ring-indigo-500/30"
                        />
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-50 dark:text-indigo-950 dark:hover:bg-indigo-100 font-semibold h-10 rounded-xl cursor-pointer"
                        >
                            Create Chat Room
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ChatDialogue