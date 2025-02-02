import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get('jwt')?.value;
  return !!token;
}

const authPages = [
  '/myaccount',
  '/find-account',
  '/settings',
  '/support',
  '/delete-account',
  '/post',
];
//탈퇴 마이잇츠 게시글 작성/수정
const guestPages = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 로그인, 회원가입 페이지 접근 제한
  if (
    guestPages.some((page) => pathname.startsWith(page)) &&
    isAuthenticated(request)
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 로그인이 필요한 페이지 접근 제한
  if (
    authPages.some((page) => pathname.startsWith(page)) &&
    !isAuthenticated(request)
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// 미들웨어가 적용될 경로를 설정
export const config = {
  matcher: [
    '/profile/:path*',
    '/login',
    '/signup',
    '/myaccount/:path*',
    '/find-account',
    '/settings',
    '/support',
    '/delete-account',
    '/post/:path*',
  ],
};
