import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths in an array
  const publicPaths = ['/login', '/sign-up', '/courses']
  const isPublicPath = publicPaths.includes(path)

  const token = request.cookies.get('token')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}
 
export const config = {
  matcher: [
    '/home',
    '/userProfile',
    '/userProfile/',
    '/login',
    '/sign-up',
    '/courses',
  ]
}
