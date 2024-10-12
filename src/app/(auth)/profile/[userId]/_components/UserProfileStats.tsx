import { FollowModal } from './FollowModal';

type UserStatsProps = {
  postCount: number;
  followerCount: number;
  followingCount: number;
};
export const UserProfileStats = ({
  postCount,
  followingCount,
  followerCount,
}: UserStatsProps) => {
  return (
    <>
      <FollowModal />{' '}
      <div className='flex gap-[30px] text-gray-700 subTitle-20'>
        <p className='p-[10px]'>게시물 {postCount}</p>
        <p className='p-[10px]'>팔로잉 {followingCount}</p>
        <p className='p-[10px]'>팔로우 {followerCount}</p>
      </div>
    </>
  );
};
