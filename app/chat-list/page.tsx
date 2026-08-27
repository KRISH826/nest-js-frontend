import type { Metadata } from 'next'
import ChatList from '@/components/chat/ChatList'

export const metadata: Metadata = {
    title: 'Chat Rooms',
    description: 'Explore and join public and workspace chat rooms on PulseChat.',
}

const page = () => {
    return (
        <>
            <ChatList />
        </>
    )
}

export default page