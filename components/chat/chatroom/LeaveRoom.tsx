import { Button } from '@/components/ui/button'
import { useLeaveChatRoomMutation } from '@/lib/api/chat-room/chatRoomApi'
import { LogOut, Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const LeaveRoom = ({ roomId }: { roomId: string }) => {
    const [leaveChatRoom, { isLoading }] = useLeaveChatRoomMutation()
    const handleLeaveRoom = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            await leaveChatRoom(roomId).unwrap()
            toast.success("Room left successfully")
        } catch (error: unknown) {
            const errorObj = error as { data?: { message?: string } };
            toast.error(errorObj?.data?.message);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8.5 w-8.5 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg cursor-pointer hidden sm:inline-flex"
                    title="Leave Room"
                >
                    <LogOut className="w-4.5 h-4.5" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You will leave the chat room.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLeaveRoom} disabled={isLoading} className="bg-rose-500 hover:bg-rose-600 text-white">
                        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Leave Room
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LeaveRoom