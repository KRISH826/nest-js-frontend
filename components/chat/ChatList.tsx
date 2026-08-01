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
                <div className='mt-8! border-0'>
                    <div>
                        <div className='grid lg:grid-cols-3 grid-cols-2 gap-5 items-center'>
                            {
                                [...Array(6)].map((_, index) => (
                                    <Card className='py-3' key={index}>
                                        <CardContent className='px-3'>
                                            <div className='flex flex-col gap-y-2 items-start justify-between'>
                                                <h2 className='xl:text-lg lg:text-base text-sm font-bold'>Chat Room {index + 1}</h2>
                                                <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate, quod.</p>
                                                <Button type='button' className='cursor-pointer' variant={"default"} onClick={() => { }}>Join</Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <ChatDialogue
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </section>
    )
}

export default ChatList