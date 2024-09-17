import { OptionButton } from '@/components/atoms/button/OptionButton';
import { Modal } from '@/components/organisms';
import Link from 'next/link';
import { useMemo, useState } from 'react';
type UserDropdownOptionProps = {
  label: string;
  href: string;
  slug?: string;
};
type LogoutButtonProps = {
  openLogoutModal: (e: React.MouseEvent) => void;
  dropdownHanlder: () => void;
  userId: string;
};
export const UserDropdownMenu = ({
  openLogoutModal,
  dropdownHanlder,
  userId,
}: LogoutButtonProps) => {
  const UserDropdownOptions = useMemo<UserDropdownOptionProps[]>(
    () => [
      { label: '내 프로필', href: '/profile/', slug: userId },
      { label: '내 계정', href: '/myaccount/', slug: userId },
      { label: '공지사항', href: '/notices' },
      { label: '기타 설정', href: '/settings' },
      { label: '1:1 문의하기', href: '/support' },
    ],
    [userId],
  );
  const handleLogoutBtn = (e: React.MouseEvent) => {
    openLogoutModal(e);
    dropdownHanlder();
  };
  return (
    <div className='w-300 absolute right-1/2 z-20 flex translate-x-[50%] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]'>
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
};
