'use client';
import { useState } from 'react';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { useDropdownHandler } from '@/hooks/useDropdownHandler';
import { ProfileImage } from '@/components/atoms';
import { DropdownMenu } from '@/components/molecules';
import { Modal } from '@/components/organisms';
import { MoreSVG } from '@/components/svg/MoreSVG';
import timeDifference from '@/utils/timeDifference';
import { UserDatatype } from '@/types/authType';

interface UserProfileProps {
  userInfo?: UserDatatype;
  nickname: string;
  profileImage: string | null;
  createdAt: string;
  handleIsEditable: () => Promise<string>;
  handleDeletePost: () => Promise<void>;
  handleOpenReportModal: () => void;
}

const UserProfile = ({
  userInfo,
  nickname,
  profileImage,
  createdAt,
  handleIsEditable,
  handleDeletePost,
  handleOpenReportModal,
}: UserProfileProps) => {
  const [modalStatus, setModalStatus] = useState({
    title: '',
    message: '',
    buttonText: '',
    handleButtonClick: () => {},
  });
  const { isDropdownOpen, dropdownHanlder, dropdownRef } = useDropdownHandler();
  const { value: isOpenModal, handleValue: handleOpenModal } =
    useToggleHandler();

  const dropdownItems = [
    {
      label: '피드 보기',
      onClick: () => {},
    },
    ...(userInfo?.nickname === nickname
      ? [
          {
            label: '수정하기',
            onClick: async () => {
              const message = await handleIsEditable();
              if (message) {
                setModalStatus({
                  title: '수정할 수 없어요',
                  message: message,
                  buttonText: '확인',
                  handleButtonClick: handleOpenModal,
                });
                handleOpenModal();
              }
            },
          },
          {
            label: '삭제하기',
            onClick: () => {
              setModalStatus({
                title: '게시물 삭제',
                message: '이 게시물을 삭제할까요?',
                buttonText: '삭제',
                handleButtonClick: handleDeletePost,
              });
              handleOpenModal();
            },
          },
        ]
      : [
          {
            label: '게시물 신고하기',
            onClick: handleOpenReportModal,
          },
        ]),
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
        title={modalStatus.title}
        size='medium'
        isOpen={isOpenModal}
        mainButton={modalStatus.buttonText}
        onMainClick={() => {
          modalStatus.handleButtonClick();
        }}
        onClose={handleOpenModal}
      >
        <p className='text-center'>{modalStatus.message}</p>
      </Modal>
    </div>
  );
};

export default UserProfile;
