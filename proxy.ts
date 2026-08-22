// src/middleware.ts (or src/proxy.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/register', '/otp'];
const PROTECTED_ROUTES = ['/', '/profile'];

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes (/api/*)
         * - static files (_next/static, _next/image)
         * - metadata/favicon files (favicon.ico, sitemap.xml, robots.txt)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};

export default function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;

    // Check presence of either access_token or refresh_token
    const accessToken = request.cookies.get('access_token')?.value;
    const refreshToken = request.cookies.get('refresh_token')?.value;
    const isAuthenticated = Boolean(accessToken || refreshToken);

    const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

    // 1. Unauthenticated user accessing a protected route -> Redirect to /login
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        const callbackUrl = pathname + search;

        loginUrl.searchParams.set('callbackUrl', callbackUrl);
        return NextResponse.redirect(loginUrl);
    }

    // 2. Authenticated user accessing auth routes (/login, /register, etc.) -> Redirect to /chat-list
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 3. Authenticated user accessing root ('/') -> Redirect to /chat-list
    if (pathname === '/' && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}