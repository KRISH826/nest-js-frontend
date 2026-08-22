// src/middleware.ts (or proxy.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/register', '/otp'];
const PROTECTED_ROUTES = ['/profile', '/complete-profile', '/dashboard', '/chat-list'];

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};

export default function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;
    const isAuthenticated = Boolean(accessToken || refreshToken);

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

    // 1. Root Path ('/') Logic
    if (pathname === '/') {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next(); // Logged-in user stays on '/' (Home)
    }

    // 2. Unauthenticated user accessing protected routes -> Redirect to /login
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname + search);
        return NextResponse.redirect(loginUrl);
    }

    // 3. Authenticated user visiting /login, /register, /otp -> Redirect to Home ('/')
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}