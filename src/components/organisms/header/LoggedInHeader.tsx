'use client';
import { useLogoutModal } from '@/app/(auth)/_hooks/useModal';
import { ProfileImage } from '@/components/atoms';
import { UserDropdownMenu } from '@/components/molecules/userDropdownMenu/UserDropdownMenu';
import { AlarmBellSVG } from '@/components/svg/AlarmBellSVG';
import { useDropdownHandler } from '@/hooks/useDropdownHandler';
import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from '..';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/auth';
interface LoggedInHeaderProps {
  loginStateHanlder: Dispatch<SetStateAction<boolean>>;
}
export const LoggedInHeader = ({ loginStateHanlder }: LoggedInHeaderProps) => {
  const { isDropdownOpen, dropdownHanlder, dropdownRef } = useDropdownHandler();
  const { closeModal, isModalOpen, logoutButton, openLogoutModal } =
    useLogoutModal();
  const { data, isLoading } = useQuery({
    queryKey: ['LoggedInUserInfo'],
    queryFn: () => getUserInfo(),
  });

  return (
    <div className='flex items-center gap-6'>
      <AlarmBellSVG />
      <div
        className='relative cursor-pointer'
        ref={dropdownRef}
        onClick={dropdownHanlder}
      >
        {isLoading ? (
          <div className='h-[50px] w-[50px] rounded-full border'></div>
        ) : (
          <>
            <ProfileImage src={data?.profileImage} size={50} />
            {isDropdownOpen && (
              <UserDropdownMenu
                userId={String(data?.id)}
                openLogoutModal={openLogoutModal}
                dropdownHanlder={dropdownHanlder}
              />
            )}
          </>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={() => closeModal}
          title='로그아웃'
          description='로그아웃하시려면 확인을 눌러주세요.'
          subButton='취소'
          onMainClick={() => logoutButton(loginStateHanlder)}
          onSubClick={closeModal}
          mainButton='확인'
        />
      </div>
    </div>
  );
};
