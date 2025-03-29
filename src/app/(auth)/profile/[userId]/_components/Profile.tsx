'use client';
import { Button, ProfileImage } from '@/components/atoms';
import { ProfileInfo } from './ProfileInfo';
import { UserProfileStats } from './UserProfileStats';
import { addDashes } from '@/utils/formatPhoneNumber';
import { UserDatatype } from '@/types/authType';
import { useQuery } from '@tanstack/react-query';
import { checkFollow } from '@/api/profile';
import { SocialActionButton } from './SocialActionButton';
import Loading from '@/components/atoms/loading/Loading';
type ProfileProps = {
  loggedInUserId?: number;
  handler?: () => void;
  userData: UserDatatype;
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
    return <Loading />;
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
        <SocialActionButton
          id={id}
          isConnected={
            loggedInUserId ? (data.statusCode ? false : true) : false
          }
          type='follow'
          isLoggedIn={!!loggedInUserId}
        />
      )}
    </div>
  );
};
