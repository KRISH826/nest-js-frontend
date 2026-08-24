"use client"
import { useGetProfileQuery } from '@/lib/api/auth/authApi'
import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useRouter } from 'next/navigation'

const User = () => {
    const { data: profile } = useGetProfileQuery()
    const router = useRouter()

    useEffect(() => {
        console.log(profile)
    }, [profile])

    return (
        <div>
            <Avatar className='cursor-pointer' onClick={() => router.push('/profile')}>
                <AvatarImage className='object-cover' src={profile?.data?.avatar?.url} />
                <AvatarFallback className="bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-lg font-bold">
                    {profile?.data?.fname?.charAt(0)}
                    {profile?.data?.lname?.charAt(0)}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

export default User