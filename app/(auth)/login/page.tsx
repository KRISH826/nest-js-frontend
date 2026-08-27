import type { Metadata } from 'next'
import LoginPage from '@/components/auth/login/LoginPage'
import React from 'react'

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your PulseChat account to access your workspace chat rooms.',
}

const page = () => {
    return (
        <div><LoginPage /></div>
    )
}

export default page