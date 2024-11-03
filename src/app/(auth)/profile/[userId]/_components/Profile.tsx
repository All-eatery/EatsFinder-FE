'use client';
import { Button, ProfileImage } from '@/components/atoms';
import { ProfileInfo } from './ProfileInfo';
import { UserProfileStats } from './UserProfileStats';
import { addDashes } from '@/utils/formatPhoneNumber';
import { UserData } from '@/types/authType';
import { FollowButton } from './FollowButton';
import { useQuery } from '@tanstack/react-query';
import { checkFollow } from '@/api/profile';
type ProfileProps = {
  loggedInUserId?: number;
  handler: () => void;
  userData: UserData;
  isOwnProfile: boolean;
};
export const Profile = ({
  loggedInUserId,
  handler,
  userData,
  isOwnProfile,
}: ProfileProps) => {
  const {
    email,
    followerCount,
    followingCount,
    nickname,
    phoneNumber,
    postCount,
    profileImage,
    id,
  } = userData;
  console.log('user', userData);
  const formattedNumber = phoneNumber && addDashes(phoneNumber);
  console.log('로그인유저 ', loggedInUserId);

  const { data, isLoading } = useQuery({
    queryKey: ['checkFollow'],
    queryFn: () => checkFollow(id),
    enabled: !!loggedInUserId,
  });
  console.log('data', data);
  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태 처리
  }
  return (
    <div className='flex flex-col items-center gap-4'>
      <ProfileImage size={100} src={profileImage} />
      <ProfileInfo
        nickname={nickname}
        email={email}
        phoneNumber={formattedNumber}
        isOwnProfile={isOwnProfile}
      />
      <UserProfileStats
        isLoggedIn={!!loggedInUserId}
        id={id}
        nickname={nickname}
        isOwnProfile={isOwnProfile}
        postCount={postCount}
        followerCount={followerCount}
        followingCount={followingCount}
      />
      {isOwnProfile ? (
        <Button size={'mini'} className='w-[124px]' onClick={handler}>
          내 프로필 수정하기
        </Button>
      ) : (
        <FollowButton
          id={id}
          isFollowed={loggedInUserId ? (data.statusCode ? false : true) : false}
          isLoggedIn={!!loggedInUserId}
        />
      )}
    </div>
  );
};
