'use client';
import { useRef, useState } from 'react';
import { FollowModal } from './FollowModal';

type UserStatsProps = {
  isLoggedIn: boolean;
  id: number;
  postCount: number;
  followerCount: number;
  followingCount: number;
  isOwnProfile: boolean;
  nickname: string;
};
export const UserProfileStats = ({
  isLoggedIn,
  id,
  postCount,
  followingCount,
  followerCount,
  nickname,
  isOwnProfile,
}: UserStatsProps) => {
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'following' | 'follower'>(
    'following',
  );

  const handleFollowingModal = (type: 'following' | 'follower') => {
    setModalType(type);
    setIsFollowModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsFollowModalOpen(false);
  };
  console.log('stats', id);
  const ref = useRef(null);
  return (
    <>
      <div className='flex gap-[30px] text-gray-700 subTitle-20'>
        <p className='p-[10px]'>게시물 {postCount}</p>
        <p
          className='cursor-pointer p-[10px]'
          onClick={() => handleFollowingModal('following')}
        >
          팔로잉 {followingCount}
        </p>
        <p 
          className='cursor-pointer p-[10px]'
          onClick={() => handleFollowingModal('follower')}
        >
          팔로워 {followerCount}
        </p>
        {isFollowModalOpen && (
          <FollowModal
            isLoggedIn={isLoggedIn}
            id={id}
            onClose={handleCloseModal}
            isOwnProfile={isOwnProfile}
            nickname={nickname}
            modalType={modalType}
          />
        )}
      </div>
    </>
  );
};
