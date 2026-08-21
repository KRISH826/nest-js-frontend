import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. Define paths that do not require session validation
const PUBLIC_FILE_PATTERN = /\.(.*)$/ // e.g. favicon.ico, images, fonts
const AUTH_ROUTES = ['/login', '/register', '/otp', "/"]
const PROTECTED_ROUTES = ['/chat-list', '/profile'] // Add other protected routes here

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    if (PUBLIC_FILE_PATTERN.test(pathname)) {
        return NextResponse.next()
    }

    const token = request.cookies.get('token')?.value ||
        request.cookies.get('session')?.value ||
        request.cookies.get('accessToken')?.value

    const isAuthenticated = !!token

    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))
    const isProtectedRoute = pathname === '/' || PROTECTED_ROUTES.some(route => pathname.startsWith(route))
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // 4. Authenticated user trying to access login/register/otp pages
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/chat-list', request.url))
    }

    return NextResponse.next()
}
