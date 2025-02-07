import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const walletLinkSession = request.cookies.get('wagmi.store')
    const { pathname } = request.nextUrl

    let isConnected = false
    if (walletLinkSession?.value) {
        try {
            const wagmiState = JSON.parse(walletLinkSession.value)
            const connections = wagmiState.state?.connections?.value
            isConnected = Array.isArray(connections) && 
                         connections.some(conn => 
                             Array.isArray(conn) && 
                             conn[1]?.accounts?.length > 0
                         )
        } catch (e) {
            console.error('Error parsing wagmi store:', e)
        }
    }

    // If connected and trying to access home page, redirect to app
    if (isConnected && pathname === '/') {
        return NextResponse.redirect(new URL('/app', request.url))
    }

    // If not connected and trying to access app routes, redirect to home
    if (!isConnected && pathname.startsWith('/app')) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }
