import { KOTLIN_SERVER, NEST_SERVER } from '@/constants/baseUrl';
import { CookieOptions } from '@/types/authType';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
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
      const errorMessage =
        data.statusCode === 401
          ? '이메일 또는 비밀번호가 올바르지 않습니다.'
          : '로그인 중 오류가 발생했습니다.';
      return NextResponse.json(
        {
          success: false,
          message: errorMessage,
          error: data.message,
        },
        { status: data.statusCode },
      );
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
    const userInfoResponse = await fetch(`${KOTLIN_SERVER}/users`, {
      method: 'GET',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
    if (!userInfoResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          message: '사용자 정보를 가져오는데 실패했습니다.',
        },
        { status: 500 },
      );
    }
    const userInfo = await userInfoResponse.json();
    cookiesStore.set('userInfo', JSON.stringify(userInfo), options);

    return NextResponse.json({
      success: true,
      message: '로그인에 성공했습니다.',
      user: userInfo,
      redirectUrl: '/',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '서버 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
};
