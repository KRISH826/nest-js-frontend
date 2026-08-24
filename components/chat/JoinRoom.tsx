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
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, Loader2, Hash, CheckCircle2, MessageSquare, Search } from 'lucide-react'
import { useGetChatroomsQuery, useJoinChatRoomMutation } from '@/lib/api/chat-room/chatRoomApi'
import { ChatRoom } from '@/types/chatroom'

import { toast } from "sonner"

interface JoinRoomProps {
  trigger?: React.ReactNode
  onSuccess?: (room: ChatRoom) => void
}

export default function JoinRoom({ trigger, onSuccess }: JoinRoomProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [joiningRoomId, setJoiningRoomId] = useState<string | null>(null)

  const { data: roomsResponse, isLoading: isLoadingRooms } = useGetChatroomsQuery()
  const [joinChatRoom] = useJoinChatRoomMutation()

  const rooms = roomsResponse?.data || []

  // Filter rooms based on search query
  const filteredRooms = rooms.filter((room) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      room.name?.toLowerCase().includes(q) ||
      room.description?.toLowerCase().includes(q) ||
      room._id?.toLowerCase().includes(q)
    )
  })

  const handleJoin = async (roomId: string) => {
    setJoiningRoomId(roomId)

    try {
      const res = await joinChatRoom(roomId).unwrap()
      const msg = res.message || 'Successfully joined chat room!'
      toast.success(msg)
      if (onSuccess && res.data) {
        onSuccess(res.data)
      }
      setOpen(false)
    } catch (err: unknown) {
      const errorObj = err as { data?: { message?: string } }
      const errMsg = errorObj?.data?.message || 'Failed to join chat room. Please try again.'
      toast.error(errMsg)
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
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 cursor-pointer rounded-md"
          >
            <span>Join Room</span>
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl md:max-w-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 rounded-md shadow-2xl transition-all">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
            Join a Chat Room
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
            Discover public channels and join active group discussions.
          </DialogDescription>
        </DialogHeader>

        {/* Search Bar with Search Button */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-zinc-500" />
            <Input
              type="text"
              placeholder="Search by room name, description, or ID key..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-11 text-xs sm:text-sm bg-slate-100/80 dark:bg-zinc-900 border-slate-200/80 dark:border-zinc-800 focus:ring-2 focus:ring-indigo-500 rounded-md transition-all"
            />
          </div>
          <Button
            type="button"
            className="h-11 px-6 text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </Button>
        </div>

        {/* Available Rooms Grid / List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[380px] overflow-y-auto pr-1 mt-4 custom-scrollbar">
          {isLoadingRooms ? (
            <div className="col-span-full flex items-center justify-center py-12 text-xs sm:text-sm text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin mr-2 text-indigo-600" />
              Loading available rooms...
            </div>
          ) : filteredRooms.length > 0 ? (
            filteredRooms.map((room) => {
              const isJoiningThis = joiningRoomId === room._id
              return (
                <div
                  key={room._id}
                  className="flex items-center justify-between p-4 rounded-md border border-slate-200/60 dark:border-zinc-800/80 bg-slate-50/60 dark:bg-zinc-900/40 hover:bg-white dark:hover:bg-zinc-900 hover:border-indigo-500/40 hover:shadow-md transition-all duration-200 gap-3"
                >
                  <Avatar className="h-11 w-11 rounded-md shrink-0 border border-slate-200 dark:border-zinc-800">
                    {room.avatar?.url ? (
                      <AvatarImage src={room.avatar.url} alt={room.name} className="object-cover rounded-md" />
                    ) : (
                      <AvatarFallback className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 font-bold text-sm rounded-md">
                        <Hash className="w-5 h-5" />
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-100 truncate">
                        {room.name}
                      </h4>
                      <span className="text-[10px] bg-slate-200/70 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-medium px-2 py-0.5 rounded-md shrink-0">
                        <Users className="w-3 h-3 inline mr-1" />
                        {room.members?.length || 1}/{room.maxMembers || 50}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-zinc-500 truncate mt-1">
                      {room.description || `ID: ${room._id}`}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleJoin(room._id)}
                    disabled={isJoiningThis || !!joiningRoomId}
                    className="h-8.5 px-4 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md cursor-pointer shrink-0 transition-transform active:scale-95 shadow-sm"
                  >
                    {isJoiningThis ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      'Join'
                    )}
                  </Button>
                </div>
              )
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center text-slate-400 dark:text-zinc-500">
              <MessageSquare className="w-8 h-8 mb-2 opacity-40 text-indigo-500" />
              <p className="text-xs sm:text-sm font-semibold">No rooms match your search</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}