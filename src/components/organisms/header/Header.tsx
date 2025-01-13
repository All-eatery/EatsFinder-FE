'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthHeader } from '@/app/(auth)/_components/AuthHeader';
import { Button, NavLink } from '@/components/atoms';
import { LogoImgSVG } from '@/components/svg/LogoSVG';
import { LoggedInHeader } from '..';
import { useEffect, useState } from 'react';
import { UserDatatype } from '@/types/authType';
import { PostingButton } from '@/components/atoms/postingButton/PostingButton';

const NAV_DATA = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '탐색피드',
    href: '/',
  },
  {
    label: 'MyEats',
    href: '/',
  },
  {
    label: '맛집정보',
    href: '/',
  },
];
type HeaderProps = {
  userInfo: UserDatatype | undefined;
};
export const Header = ({ userInfo }: HeaderProps) => {
  const path = usePathname();
  const userState = !!userInfo;
  const [isLoggedIn, setIsLoggedIn] = useState(userState);
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [userInfo]);

  if (path.startsWith('/login') || path.startsWith('/signup')) {
    return <AuthHeader />;
  }
  return (
    <header className='mb-[3.75rem] flex h-20 items-center justify-around'>
      <div className='flex w-full max-w-[1440px] items-center justify-between px-9'>
        <div>
          <Link href='/'>
            <LogoImgSVG />
          </Link>
        </div>
        <div>
          <ul className='flex gap-[60px]'>
            {NAV_DATA.map((link, index) => {
              return (
                <li key={index}>
                  <NavLink className='w-[90px]' href={link.href}>
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
        {isLoggedIn ? (
          <LoggedInHeader loginStateHanlder={setIsLoggedIn} />
        ) : (
          <Button size={'mini'}>
            <Link href={'/login'}>로그인</Link>
          </Button>
        )}
      </div>
      {isLoggedIn && <PostingButton />}
    </header>
  );
};
