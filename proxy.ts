import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. Define paths that do not require session validation
const PUBLIC_FILE_PATTERN = /\.(.*)$/ // e.g. favicon.ico, images, fonts
const AUTH_ROUTES = ['/login', '/register', '/otp']
const PROTECTED_ROUTES = ['/chat-list', '/profile'] // Add other protected routes here

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}

/**
 * The proxy function executes on the server before requests are completed.
 * It handles route protection by checking for the presence of authentication cookies.
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Ignore requests for static files/assets
    if (PUBLIC_FILE_PATTERN.test(pathname)) {
        return NextResponse.next()
    }

    const token = request.cookies.get('token')?.value ||
        request.cookies.get('session')?.value ||
        request.cookies.get('accessToken')?.value

    const isAuthenticated = !!token

    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))
    const isProtectedRoute = pathname === '/' || PROTECTED_ROUTES.some(route => pathname.startsWith(route))

    // 3. Unauthenticated user trying to access a protected page
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url)
        // Save the original path as a callbackUrl so we can redirect back after successful login
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // 4. Authenticated user trying to access login/register/otp pages
    if (isAuthRoute && isAuthenticated) {
        // Redirect them to the main application page
        return NextResponse.redirect(new URL('/chat-list', request.url))
    }

    return NextResponse.next()
}
