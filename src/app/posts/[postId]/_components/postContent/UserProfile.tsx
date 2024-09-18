'use client';
import { useState } from 'react';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { useDropdownHandler } from '@/hooks/useDropdownHandler';
import { ProfileImage } from '@/components/atoms';
import { DropdownMenu } from '@/components/molecules';
import { Modal } from '@/components/organisms';
import { MoreSVG } from '@/components/svg/MoreSVG';
import timeDifference from '@/utils/timeDifference';
import { getClientUserInfo } from '@/utils/getClientUserInfo';

interface UserProfileProps {
  nickname: string;
  profileImage: string | null;
  createdAt: string;
  handleIsEditable: () => Promise<string>;
}

const UserProfile = ({
  nickname,
  profileImage,
  createdAt,
  handleIsEditable,
}: UserProfileProps) => {
  const userInfo = getClientUserInfo();
  const [alertMessage, setAlertMessage] = useState('');
  const { isDropdownOpen, dropdownHanlder, dropdownRef } = useDropdownHandler();
  const { value: isOpenAlertModal, handleValue: handleOpenAlertModal } =
    useToggleHandler();
  const dropdownItems = [
    {
      label: '피드 보기',
      onClick: () => {},
    },
    ...(userInfo.nickname === nickname
      ? [
          {
            label: '수정하기',
            onClick: async () => {
              const message = await handleIsEditable();
              if (message) {
                setAlertMessage(message);
                handleOpenAlertModal();
              }
            },
          },
          {
            label: '삭제하기',
            onClick: () => {},
          },
        ]
      : [{ label: '게시물 신고하기', onClick: () => {} }]),
  ];
  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-3'>
        <ProfileImage size={50} src={profileImage} />
        <span className='text-gray-600 subTitle-18'>{nickname}</span>
        <span className='text-gray-300 body-16'>
          {timeDifference(createdAt)}
        </span>
      </div>
      <div className='relative' ref={dropdownRef}>
        <button
          className='h-full [&>svg]:h-9 [&>svg]:w-9'
          aria-label='more'
          onClick={dropdownHanlder}
        >
          <MoreSVG />
        </button>
        {isDropdownOpen && <DropdownMenu dropdownItems={dropdownItems} />}
      </div>
      <Modal
        title='수정을 할 수 없어요'
        size='medium'
        isOpen={isOpenAlertModal}
        mainButton='확인'
        onMainClick={handleOpenAlertModal}
        onClose={handleOpenAlertModal}
      >
        <p className='text-center'>{alertMessage}</p>
      </Modal>
    </div>
  );
};

export default UserProfile;
