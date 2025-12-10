'use client';
import { OptionButton } from '@/components/atoms/button/OptionButton';
import { route, RouteKey } from '@/constants/route';
import Link from 'next/link';
import { useMemo } from 'react';
type UserDropdownOptionProps = {
  label: string;
  href: string;
  slug?: string;
};
type LogoutButtonProps = {
  openLogoutModal: (e: React.MouseEvent) => void;
  dropdownHanlder: () => void;
  userId: string;
  pathKey: RouteKey;
};
export const UserDropdownMenu = ({
  openLogoutModal,
  dropdownHanlder,
  pathKey,
  userId,
}: LogoutButtonProps) => {
  const UserDropdownOptions = useMemo<UserDropdownOptionProps[]>(
    () => [
      { label: '내 프로필', href: '/profile/', slug: userId },
      { label: '내 계정', href: '/myaccount/' },
      { label: '공지사항', href: '/notices' },
      { label: '기타 설정', href: '/settings' },
      { label: '1:1 문의하기', href: '/inquiry' },
    ],
    [userId],
  );
  const handleLogoutBtn = (e: React.MouseEvent) => {
    openLogoutModal(e);
    dropdownHanlder();
  };
  const DesktopMenu = (
    <div className='w-300 absolute right-1/2 z-20 flex translate-x-[19%] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]'>
      {UserDropdownOptions.map((option, idx) => {
        const href = option.slug ? `${option.href}${option.slug}` : option.href;
        return (
          <Link href={href} key={idx}>
            <OptionButton className='w-[300px]'>{option.label}</OptionButton>
          </Link>
        );
      })}
      <OptionButton onClick={handleLogoutBtn} className='w-[300px]'>
        로그아웃
      </OptionButton>
    </div>
  );
  const MobileMenu = (
    <div className='fixed inset-0 z-20 flex w-full flex-col bg-white'>
      <h2 className='py-3 text-center text-gray-800 subTitle-16'>
        {route[pathKey]}
      </h2>
      {UserDropdownOptions.map((option, idx) => {
        const href = option.slug ? `${option.href}${option.slug}` : option.href;
        return (
          <Link href={href} key={idx} className='w-full'>
            <OptionButton>{option.label}</OptionButton>
          </Link>
        );
      })}
      <OptionButton onClick={handleLogoutBtn}>로그아웃</OptionButton>
    </div>
  );
  return (
    <>
      <div className='hidden lg:block'>{DesktopMenu}</div>
      <div className='lg:hidden'>{MobileMenu}</div>
    </>
  );
};
