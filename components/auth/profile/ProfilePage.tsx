"use client"

import React from 'react'
import { GalleryVerticalEnd, ArrowLeft } from 'lucide-react'
import ProfileForm from './ProfileForm'
import { useGetProfileQuery } from '@/lib/api/auth/authApi'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const ProfilePage = () => {
    const { data: profileResponse } = useGetProfileQuery()
    const router = useRouter()
    const user = profileResponse?.data
    const isProfileComplete = Boolean(user?.isProfileComplete ?? (user?.fname && user?.lname))

    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-slate-50 dark:bg-slate-950 p-6 md:p-10">
            {/* Light Mode Ambient Blurred Round Lighting Effects */}
            <div className="absolute -top-24 -left-24 h-100 w-100 rounded-full bg-sky-300/50 dark:bg-sky-900/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-100 w-100 rounded-full bg-purple-300/50 dark:bg-purple-900/30 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-87.5 w-87.5 rounded-full bg-indigo-200/50 dark:bg-indigo-900/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex w-full max-w-sm sm:max-w-md flex-col gap-6">
                <div className="relative flex items-center justify-center w-full">
                    {isProfileComplete && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push('/')}
                            className="absolute left-0 h-8 w-8 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 cursor-pointer"
                            title="Go back"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    )}
                    <a href="/chat-list" className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
                        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        Acme Inc.
                    </a>
                </div>
                <ProfileForm />
            </div>
        </div>
    )
}

export default ProfilePage
