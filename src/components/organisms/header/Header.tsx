'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthHeader } from '@/app/(auth)/_components/AuthHeader';
import { Button, NavLink } from '@/components/atoms';
import { LogoImgSVG, LogoMobileSVG } from '@/components/svg/LogoSVG';
import { LoggedInHeader } from '..';
import { useEffect, useState } from 'react';
import { UserDatatype } from '@/types/authType';
import { PostingButton } from '@/components/atoms/postingButton/PostingButton';
import { NAV_DATA } from '@/constants/navData';
import { MobileNav } from '../mobile/MobileNav';

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
    <header className='flex items-center justify-around py-2 lg:mb-[3.75rem] lg:h-20'>
      <div className='flex w-full max-w-[1440px] items-center justify-between px-4 lg:px-9'>
        <div>
          <Link href='/'>
            <LogoImgSVG className='hidden lg:block' />
            <LogoMobileSVG className='block lg:hidden' />
          </Link>
        </div>
        <nav className='hidden lg:block'>
          <ul className='flex gap-[60px]'>
            {NAV_DATA.map(({ label, href, page }, index) => {
              const isActive = path === page;
              return (
                <li key={index}>
                  <NavLink className='w-[90px]' href={href} active={isActive}>
                    {label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
        {isLoggedIn ? (
          <LoggedInHeader loginStateHanlder={setIsLoggedIn} />
        ) : (
          <Button size={'mini'}>
            <Link href={'/login'}>로그인</Link>
          </Button>
        )}
      </div>
      {isLoggedIn && <PostingButton />}
      <MobileNav path={path} />
    </header>
  );
};
