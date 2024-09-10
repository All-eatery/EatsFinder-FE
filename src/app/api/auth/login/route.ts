import { KOTLIN_SERVER, NEST_SERVER } from '@/constants/baseUrl';
import { CookieOptions } from '@/types/authType';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const response = await fetch(`${NEST_SERVER}/auth/login`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
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

  redirect('/login?error=fail');
};
