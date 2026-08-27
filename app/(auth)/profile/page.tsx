import type { Metadata } from 'next'
import React from 'react'
import ProfilePage from '@/components/auth/profile/ProfilePage'

export const metadata: Metadata = {
    title: 'User Profile',
    description: 'Manage your PulseChat user profile details and settings.',
}

export default function ProfilePageRoute() {
    return <ProfilePage />
}
