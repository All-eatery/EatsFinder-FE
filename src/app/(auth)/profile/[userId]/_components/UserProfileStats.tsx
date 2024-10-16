'use client';
import { useRef, useState } from 'react';
import { FollowModal } from './FollowModal';
import { getFollowing } from '@/api/profile';

type UserStatsProps = {
  id: number;
  postCount: number;
  followerCount: number;
  followingCount: number;
};
export const UserProfileStats = ({
  id,
  postCount,
  followingCount,
  followerCount,
}: UserStatsProps) => {
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const handleFollowingModal = () => {
    setIsFollowModalOpen(true);
    //데이터 가져오는 로직
  };
  console.log('stats', id);
  const ref = useRef(null);
  return (
    <>
      <div className='flex gap-[30px] text-gray-700 subTitle-20'>
        <p className='p-[10px]'>게시물 {postCount}</p>
        {/*팔로잉이나 팔로우 버튼을 누름으로써 모달을 연다.
        그리고 팔로잉인지 팔로우인지 다른 api를 요청하고 버튼을 활성화한다. */}
        <p className='cursor-pointer p-[10px]' onClick={handleFollowingModal}>
          팔로잉 {followingCount}
        </p>
        <p className='cursor-pointer p-[10px]'>팔로우 {followerCount}</p>
        {isFollowModalOpen && <FollowModal id={id} />}
      </div>
    </>
  );
};
