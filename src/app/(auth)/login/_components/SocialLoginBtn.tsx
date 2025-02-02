'use client';
import {
  SocialGoogleSVG,
  SocialKakaoSVG,
  SocialNaverSVG,
} from '@/components/svg/SocialSVG';
import React, { ComponentProps, ReactNode, useEffect } from 'react';
import { RecentLoginMsg } from './RecentLoginMsg';
import Link from 'next/link';
import { KOTLIN_SERVER, NEST_SERVER } from '@/constants/baseUrl';
interface SocialLoginBtnProps extends ComponentProps<'button'> {
  icon: ReactNode;
  provider: string;
  recentLogin: boolean;
}
const SocialLoginBtn = ({
  icon,
  recentLogin,
  provider,
  ...props
}: SocialLoginBtnProps) => {
  const href =
    provider === 'NAVER'
      ? `${NEST_SERVER}/auth/login/${provider}`
      : `${KOTLIN_SERVER}/auth/login/${provider}`;
  return (
    <div className='relative flex flex-col items-center'>
      <Link href={href}>{icon}</Link>
      <RecentLoginMsg recentLogin={recentLogin} />
    </div>
  );
};
export const SocialLoginBtnGroup = ({
  socialProvider,
}: {
  socialProvider: string | undefined;
}) => {
  console.log(socialProvider);
  return (
    <div className='mb-[120px] flex justify-center gap-6'>
      <SocialLoginBtn
        provider='NAVER'
        icon={<SocialNaverSVG />}
        recentLogin={socialProvider === 'naver'}
      />
      <SocialLoginBtn
        provider='KAKAO'
        icon={<SocialKakaoSVG />}
        recentLogin={socialProvider === 'kakao'}
      />
      <SocialLoginBtn
        provider='GOOGLE'
        icon={<SocialGoogleSVG />}
        recentLogin={socialProvider === 'google'}
      />
    </div>
  );
};
