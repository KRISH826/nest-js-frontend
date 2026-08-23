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
import { useForm } from 'react-hook-form'
import { CreateChatRoomSchemaType, createChatRoomSchema } from '@/schema/chatroom.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateChatRoomMutation } from '@/lib/api/chat-room/chatRoomApi'
import { Loader2 } from 'lucide-react'

interface ChatDialogueProps {
    isOpen: boolean
    onClose: () => void
}

export function ChatDialogue({ isOpen, onClose }: ChatDialogueProps) {
    const [createChatRoom, { isLoading: isCreating }] = useCreateChatRoomMutation()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateChatRoomSchemaType>({
        resolver: zodResolver(createChatRoomSchema),
        defaultValues: {
            name: "",
            description: "",
            maxMembers: 10
        }
    })
    const onSubmit = async (data: CreateChatRoomSchemaType) => {
        try {
            await createChatRoom(data).unwrap()
            onClose()
        } catch (error) {
            console.log(error)
        }
    }

    const isLoading = isCreating || isSubmitting

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
            <DialogContent className="sm:max-w-120.25 max-w-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-heading font-bold text-zinc-900 dark:text-zinc-50">Create Chat Room</DialogTitle>
                    <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                        Fill in the details below to create a new workspace chat room.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Room Name</Label>
                        <Input
                            type="text"
                            placeholder="e.g. Design Sync"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500">{errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</Label>
                        <Textarea
                            placeholder="What is this room about?"
                            rows={4}
                            className='min-h-20'
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-xs text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Max Members Limit</Label>
                        <Input
                            type="number"
                            placeholder="e.g. 10 (optional)"
                            min={1}
                            {...register("maxMembers", { valueAsNumber: true })}
                        />
                        {errors.maxMembers && (
                            <p className="text-xs text-red-500">{errors.maxMembers.message}</p>
                        )}
                    </div>

                    <DialogFooter className="pt-2 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="dark:bg-indigo-50 dark:text-indigo-950 dark:hover:bg-indigo-100 font-semibold h-11 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Chat Room'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ChatDialogue