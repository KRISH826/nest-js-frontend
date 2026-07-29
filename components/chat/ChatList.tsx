import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'

const ChatList = () => {
    return (
        <section className='chat__list'>
            <div className='max-w-237.5 mx-auto py-10'>
                <div className='flex items-center justify-between'>
                    <h1 className='xl:text-3xl lg:text-2xl text-xl font-bold'>Chat List</h1>
                    <Button>Create Chat Room</Button>
                </div>
                <Card className='mt-8! shadow-2xl'>
                    <CardContent>

                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default ChatList