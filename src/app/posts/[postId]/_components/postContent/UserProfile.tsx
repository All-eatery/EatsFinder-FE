'use client';
import { useDropdownHandler } from '@/hooks/useDropdownHandler';
import { ProfileImage } from '@/components/atoms';
import { DropdownMenu } from '@/components/molecules';
import { MoreSVG } from '@/components/svg/MoreSVG';
import timeDifference from '@/utils/timeDifference';
import { getClientUserInfo } from '@/utils/getClientUserInfo';

interface UserProfileProps {
  nickname: string;
  profileImage: string | null;
  createdAt: string;
}

const UserProfile = ({
  nickname,
  profileImage,
  createdAt,
}: UserProfileProps) => {
  const userInfo = getClientUserInfo();
  const { isDropdownOpen, dropdownHanlder, dropdownRef } = useDropdownHandler();
  const dropdownItems = [
    {
      label: '피드 보기',
      onClick: () => {},
    },
    ...(userInfo.nickname === nickname
      ? [
          {
            label: '수정하기',
            onClick: () => {},
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
    </div>
  );
};

export default UserProfile;
