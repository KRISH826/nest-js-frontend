"use client"

import React, { useState, useRef } from 'react'
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useForm } from 'react-hook-form'
import { CreateChatRoomSchemaType, createChatRoomSchema } from '@/schema/chatroom.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateChatRoomMutation } from '@/lib/api/chat-room/chatRoomApi'
import { Camera, Loader2, Upload } from 'lucide-react'

interface ChatDialogueProps {
    isOpen: boolean
    onClose: () => void
}

export function ChatDialogue({ isOpen, onClose }: ChatDialogueProps) {
    const [createChatRoom, { isLoading: isCreating }] = useCreateChatRoomMutation()
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<CreateChatRoomSchemaType>({
        resolver: zodResolver(createChatRoomSchema),
        defaultValues: {
            name: "",
            description: "",
            maxMembers: 5
        }
    })

    const roomName = watch("name")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const resetDialogState = () => {
        reset({
            name: "",
            description: "",
            maxMembers: 5
        })
        setAvatarFile(null)
        setAvatarPreview(null)
    }

    const handleClose = () => {
        resetDialogState()
        onClose()
    }

    const onSubmit = async (data: CreateChatRoomSchemaType) => {
        try {
            const formData = new FormData()
            formData.append('name', data.name)
            if (data.description) {
                formData.append('description', data.description)
            }
            formData.append('maxMembers', String(data.maxMembers))
            if (avatarFile) {
                formData.append('avatar', avatarFile)
            }

            await createChatRoom(formData).unwrap()
            handleClose()
        } catch (error) {
            console.log("Error creating chat room:", error)
        }
    }

    const isLoading = isCreating || isSubmitting
    const initials = roomName ? roomName.trim().substring(0, 2).toUpperCase() : "CR"

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose() }}>
            <DialogContent className="sm:max-w-120.25 max-w-full border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-heading font-bold text-zinc-900 dark:text-zinc-50">Create Chat Room</DialogTitle>
                    <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
                        Fill in the details below to create a new workspace chat room.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
                    {/* Avatar Upload Section */}
                    <div className="flex flex-col items-center justify-center gap-2 py-2">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <Avatar className="size-20! ring-4 ring-background shadow-md transition-transform duration-200 group-hover:scale-105">
                                <AvatarImage src={avatarPreview || undefined} alt="Room Avatar" className="object-cover" />
                                <AvatarFallback className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-lg font-bold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>

                            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Camera className="w-5 h-5 text-white" />
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="gap-1.5 text-xs cursor-pointer"
                        >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{avatarPreview ? 'Change Avatar' : 'Upload Avatar'}</span>
                        </Button>
                    </div>

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
                            rows={3}
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
                            placeholder="e.g. 5"
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
                            onClick={handleClose}
                            className="cursor-pointer h-10"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            className="dark:bg-indigo-50 dark:text-indigo-950 dark:hover:bg-indigo-100 font-semibold h-10 cursor-pointer"
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