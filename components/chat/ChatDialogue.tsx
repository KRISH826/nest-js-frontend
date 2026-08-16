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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ChatDialogueProps {
    isOpen: boolean
    onClose: () => void
}

const ChatDialogue = ({ isOpen, onClose }: ChatDialogueProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
            <DialogContent className="sm:max-w-120.25 max-w-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-heading font-bold text-zinc-900 dark:text-zinc-50">Create Chat Room</DialogTitle>
                    <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                        Fill in the details below to create a new workspace chat room.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Room Name</Label>
                        <Input
                            type="text"
                            placeholder="e.g. Design Sync"
                            required />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</Label>
                        <Textarea
                            placeholder="What is this room about?"
                            rows={4}
                            className='min-h-20'
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Max Members Limit</Label>
                        <Input
                            type="number"
                            placeholder="e.g. 10 (optional)"
                            min={1} />
                    </div>

                    <DialogFooter className="pt-2">
                        <Button
                            type="submit"
                            className="w-ful dark:bg-indigo-50 dark:text-indigo-950 dark:hover:bg-indigo-100 font-semibold h-11 cursor-pointer"
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