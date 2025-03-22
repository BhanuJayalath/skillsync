import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths in an array
  const publicPaths = [

    '/home',
    '/basic-test',
    '/courses',
    '/job-recommendations',
    '/job-recommendations/:path*',
    '/mock-interview',
    '/recommended-jobs',
    '/recruiter-profile',
    '/test',


    '/login',
    '/sign-up',
]
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
    '/basic-test',
    '/courses',
    '/job-recommendations',
    '/job-recommendations/:path*',
    '/mock-interview',
    '/recommended-jobs',
    '/recruiter-profile',
    '/test',
    '/userProfile',

    '/login',
    '/sign-up',
  ]
}
