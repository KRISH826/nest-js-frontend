"use client"

import React, { useState, useRef, useEffect } from 'react'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, Users, Shield, UserCheck, Settings2, X, Loader2 } from 'lucide-react'
import { useGetChatRoomByIdQuery, useUpdateChatRoomByIdMutation } from '@/lib/api/chat-room/chatRoomApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { UpdateChatRoomSchemaType, createChatRoomSchema } from '@/schema/chatroom.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface ChatViewandUpdateProps {
    roomId?: string;
    open?: boolean;
    openChange?: (open: boolean) => void;
}

export default function ChatViewandUpdate({ open = false, openChange, roomId }: ChatViewandUpdateProps) {
    const { data: chatroomdata } = useGetChatRoomByIdQuery(roomId ?? skipToken, {
        skip: !roomId || !open
    })

    const [updateChatRoom, { isLoading: isUpdating }] = useUpdateChatRoomByIdMutation()

    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<UpdateChatRoomSchemaType>({
        resolver: zodResolver(createChatRoomSchema),
        defaultValues: {
            name: "",
            description: "",
            maxMembers: 5
        }
    })

    const roomName = watch("name")
    const maxMembers = watch("maxMembers")

    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (chatroomdata?.data) {
            reset({
                name: chatroomdata.data.name ?? "",
                description: chatroomdata.data.description ?? "",
                maxMembers: chatroomdata.data.maxMembers ?? 5,
            })
            if (chatroomdata.data.avatar?.url) {
                setAvatarPreview(chatroomdata.data.avatar.url)
            } else {
                setAvatarPreview(null)
            }
            setAvatarFile(null)
        }
    }, [chatroomdata, reset])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            setAvatarPreview(URL.createObjectURL(file))
        }
    }

    const onSubmit = async (data: UpdateChatRoomSchemaType) => {
        if (!roomId) return
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

            const res = await updateChatRoom({ id: roomId, data: formData }).unwrap()
            toast.success(res.message || 'Chat room updated successfully!')
            openChange?.(false)
        } catch (error: unknown) {
            const errorObj = error as { data?: { message?: string } }
            toast.error(errorObj?.data?.message || "Failed to update chat room.")
        }
    }

    const isLoading = isUpdating || isSubmitting
    const initials = roomName ? roomName.trim().substring(0, 2).toUpperCase() : "CR"

    // Dummy members list for UI preview
    const members = [
        { id: '1', name: 'Alex Rivers', email: 'alex@example.com', role: 'Admin', isOnline: true },
        { id: '2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'Member', isOnline: true },
        { id: '3', name: 'Michael Scott', email: 'michael@example.com', role: 'Member', isOnline: false },
        { id: '4', name: 'Emily Watson', email: 'emily@example.com', role: 'Member', isOnline: true },
    ]

    return (
        <Drawer direction="right" open={open} onOpenChange={openChange}>
            <DrawerContent className="h-full sm:max-w-137.5! w-full bg-white rounded-none! dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col p-0">
                <DrawerHeader className="relative border-b border-zinc-100 dark:border-zinc-900 pb-4 px-6 pt-5">
                    <div className="flex items-center justify-between">
                        <DrawerTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                            <Settings2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            <span>Room Info & Settings</span>
                        </DrawerTitle>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                                <X className="w-4 h-4" />
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    {/* Scrollable Content Body */}
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-thin scrollbar-fade custom-scrollbar">
                        {/* Avatar Upload Section */}
                        <div className="flex flex-col items-center justify-center gap-2 py-2">
                            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <Avatar className="size-20! ring-4 ring-indigo-500/20 shadow-md transition-transform duration-200 group-hover:scale-105">
                                    <AvatarImage src={avatarPreview || undefined} alt="Room Avatar" className="object-cover" />
                                    <AvatarFallback className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-xl font-bold">
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
                                className="gap-1.5 text-xs cursor-pointer rounded-lg border-zinc-200 dark:border-zinc-800"
                            >
                                <Upload className="w-3.5 h-3.5" />
                                <span>{avatarPreview ? 'Change Avatar' : 'Upload Avatar'}</span>
                            </Button>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Room Name</Label>
                                <Input
                                    type="text"
                                    placeholder="e.g. Design Sync"
                                    {...register("name")}
                                    className="h-10 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 rounded-xl"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Description</Label>
                                <Textarea
                                    placeholder="What is this room about?"
                                    rows={3}
                                    className="min-h-20 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 rounded-xl"
                                    {...register("description")}
                                />
                                {errors.description && (
                                    <p className="text-xs text-red-500">{errors.description.message}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Max Members Limit</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 10"
                                    min={1}
                                    {...register("maxMembers", { valueAsNumber: true })}
                                    className="h-10 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 rounded-xl"
                                />
                                {errors.maxMembers && (
                                    <p className="text-xs text-red-500">{errors.maxMembers.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Room Members Section */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                                    <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
                                        Room Members ({chatroomdata?.data?.members?.length || members.length})
                                    </h3>
                                </div>
                                <span className="text-[11px] text-zinc-400 font-medium">
                                    Limit: {chatroomdata?.data?.members?.length || members.length}/{maxMembers || 5}
                                </span>
                            </div>

                            <div className="space-y-2">
                                {members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 hover:border-zinc-200 dark:hover:border-zinc-700 transition-all"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="relative">
                                                <Avatar className="h-9 w-9 rounded-full shrink-0">
                                                    <AvatarFallback className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                                                        {member.name.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span
                                                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-zinc-950 ${member.isOnline ? 'bg-emerald-500' : 'bg-zinc-400'
                                                        }`}
                                                />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 truncate">
                                                    {member.name}
                                                </span>
                                                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                                                    {member.email}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 shrink-0">
                                            {member.role === 'Admin' ? (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                                                    <Shield className="w-3 h-3" />
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                                                    <UserCheck className="w-3 h-3 text-zinc-400" />
                                                    Member
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <DrawerFooter className="border-t border-zinc-100 dark:border-zinc-900 p-4 sm:px-6 flex-row justify-end gap-2">
                        <DrawerClose asChild>
                            <Button type="button" variant="outline" className="cursor-pointer text-xs h-10 px-4 rounded-md">
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs h-10 px-5 rounded-md cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}