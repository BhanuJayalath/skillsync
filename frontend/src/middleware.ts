import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths using regex patterns
  const publicPathPatterns = [
    /^\/home$/,
    /^\/basic-test$/,
    /^\/courses$/,
    /^\/job-recommendations(\/.*)?$/,
    /^\/mock-interview$/,
    /^\/recommended-jobs$/,
    /^\/recruiter-profile$/,
    /^\/test$/,
    /^\/login$/,
    /^\/sign-up$/,
  ]

  const isPublicPath = publicPathPatterns.some((pattern) => pattern.test(path))
  const token = request.cookies.get('token')?.value || ''

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

  return NextResponse.next() // Always good to return next if no redirect occurs
}
 
export const config = {
  matcher: [
    '/home',
    '/basic-test',
    '/courses',
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
