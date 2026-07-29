"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import ChatDialogue from './ChatDialogue'

const ChatList = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <section className='chat__list'>
            <div className='max-w-237.5 mx-auto py-10'>
                <div className='flex items-center justify-between'>
                    <h1 className='xl:text-3xl lg:text-2xl text-xl font-bold'>Chat List</h1>
                    <Button onClick={() => setIsDialogOpen(true)}>Create Chat Room</Button>
                </div>
                <Card className='mt-8!'>
                    <CardContent>
                        <div className='grid grid-cols-4 gap-5 items-center'>

                        </div>
                    </CardContent>
                </Card>
            </div>

            <ChatDialogue
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </section>
    )
}

export default ChatList