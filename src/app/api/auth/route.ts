import { KOTLIN_SERVER, NEST_SERVER } from '@/constants/baseUrl';
import { CookieOptions } from '@/types/authType';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get('code');
  const provider = searchParams.get('provider');
  const state = searchParams.get('state');
  const baseUrl = provider === 'naver' ? NEST_SERVER : KOTLIN_SERVER;
  const response = await fetch(
    `${baseUrl}/auth/callback/${provider}?code=${code}&state=${state}`,
    {
      method: 'GET',
      headers: {
        accept: '*/*',
      },
    },
  );

  const data = await response.json();

  if (data.statusCode) {
    return redirect('/login?error=fail');
  }
  const cookiesStore = cookies();
  const loginSaveState = cookiesStore.get('isLoginSave');
  const options: CookieOptions = {
    path: '/',
    httpOnly: true,
  };
  if (loginSaveState) {
    options['maxAge'] = 2592000;
  }
  const providerOptions: CookieOptions = {
    path: '/',
    httpOnly: true,
    maxAge: 31536000, // 1년 (초 단위)
  };
  cookiesStore.set('socialProvider', `${provider}`, providerOptions);
  cookiesStore.set('jwt', `${data.accessToken}`, options);
  const cookie = cookiesStore.get('jwt');
  if (cookie) {
    const response = await fetch(`${KOTLIN_SERVER}/users`, {
      method: 'GET',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
    const userInfo = await response.json();
    cookiesStore.set('userInfo', JSON.stringify(userInfo), options);
    redirect('/');
  }

  return redirect('/login');
};
