import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetChatRoomByIdQuery } from '@/lib/api/chat-room/chatRoomApi'
import React from 'react'

interface ChatViewandUpdateProps {
    roomId?: string;
    open?: boolean;
    openChange?: (open: boolean) => void;
}

const ChatViewandUpdate = ({ roomId, open = false, openChange }: ChatViewandUpdateProps) => {
    const { data: response, refetch } = useGetChatRoomByIdQuery(roomId || "", { skip: !roomId })
    const chatRoom = response?.data;
    console.log(chatRoom)
    return (
        <Dialog open={open} onOpenChange={openChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>View and Update Chat Room</DialogTitle>
                    <DialogDescription>
                        View and update chat room information
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ChatViewandUpdate