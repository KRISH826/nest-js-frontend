import type { Metadata } from 'next'
import React from 'react'
import RegisterPage from '@/components/auth/register/RegisterPage'

export const metadata: Metadata = {
    title: 'Create Account',
    description: 'Create a new PulseChat account to collaborate with your team in real time.',
}

export default function Page() {
    return (
        <RegisterPage />
    )
}

