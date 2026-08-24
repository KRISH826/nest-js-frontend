"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogIn, Users, Loader2, Hash, CheckCircle2, MessageSquare } from 'lucide-react'
import { useGetChatroomsQuery, useJoinChatRoomMutation } from '@/lib/api/chat-room/chatRoomApi'
import { ChatRoom } from '@/types/chatroom'

interface JoinRoomProps {
  trigger?: React.ReactNode
  onSuccess?: (room: ChatRoom) => void
}

export default function JoinRoom({ trigger, onSuccess }: JoinRoomProps) {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [joiningRoomId, setJoiningRoomId] = useState<string | null>(null)

  const { data: roomsResponse, isLoading: isLoadingRooms } = useGetChatroomsQuery()
  const [joinChatRoom] = useJoinChatRoomMutation()

  const rooms = roomsResponse?.data || []

  const handleJoin = async (roomId: string) => {
    setErrorMessage('')
    setSuccessMessage('')
    setJoiningRoomId(roomId)

    try {
      const res = await joinChatRoom(roomId).unwrap()
      setSuccessMessage(res.message || 'Successfully joined chat room!')
      if (onSuccess && res.data) {
        onSuccess(res.data)
      }
      setTimeout(() => {
        setOpen(false)
        setSuccessMessage('')
      }, 1000)
    } catch (err: unknown) {
      const errorObj = err as { data?: { message?: string } }
      setErrorMessage(errorObj?.data?.message || 'Failed to join chat room. Please try again.')
    } finally {
      setJoiningRoomId(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 cursor-pointer"
          >
            <span>Join Room</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xl">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-lg font-bold text-slate-800 dark:text-zinc-100">
            Join a Chat Room
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-zinc-400">
            Select an available chat room below to join immediately.
          </DialogDescription>
        </DialogHeader>

        {/* Feedback Messages */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {successMessage}
          </div>
        )}

        {/* Available Rooms List */}
        <div className="flex flex-col gap-2.5 max-h-[320px] overflow-y-auto pr-1 mt-2 custom-scrollbar">
          {isLoadingRooms ? (
            <div className="flex items-center justify-center py-8 text-xs text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin mr-2 text-indigo-600" />
              Loading available rooms...
            </div>
          ) : rooms.length > 0 ? (
            rooms.map((room) => {
              const isJoiningThis = joiningRoomId === room._id
              return (
                <div
                  key={room._id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-zinc-900 bg-slate-50/50 dark:bg-zinc-900/50 hover:bg-slate-100/70 dark:hover:bg-zinc-900/90 transition-all gap-3"
                >
                  <Avatar className="h-9 w-9 rounded-xl shrink-0 border border-slate-200 dark:border-zinc-800">
                    {room.avatar?.url ? (
                      <AvatarImage src={room.avatar.url} alt={room.name} className="object-cover" />
                    ) : (
                      <AvatarFallback className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                        <Hash className="w-4 h-4" />
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-100 truncate">
                        {room.name}
                      </h4>
                      <span className="text-[10px] bg-slate-200/70 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-medium px-1.5 py-0.2 rounded shrink-0">
                        <Users className="w-2.5 h-2.5 inline mr-1" />
                        {room.members?.length || 1}/{room.maxMembers || 50}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 truncate mt-0.5">
                      {room.description || `ID: ${room._id}`}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleJoin(room._id)}
                    disabled={isJoiningThis || !!joiningRoomId}
                    className="h-7 px-3 text-[11px] font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer shrink-0"
                  >
                    {isJoiningThis ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      'Join'
                    )}
                  </Button>
                </div>
              )
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400 dark:text-zinc-500">
              <MessageSquare className="w-6 h-6 mb-2 opacity-50 text-indigo-500" />
              <p className="text-xs font-semibold">No rooms available to join</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}