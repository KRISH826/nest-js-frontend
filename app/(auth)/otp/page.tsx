import type { Metadata } from 'next'
import React from 'react'
import OtpPage from '@/components/auth/otp/OtpPage'

export const metadata: Metadata = {
    title: 'Verify OTP',
    description: 'Verify your email address to complete your PulseChat registration.',
}

export default function Page() {
    return (
        <OtpPage />
    )
}

