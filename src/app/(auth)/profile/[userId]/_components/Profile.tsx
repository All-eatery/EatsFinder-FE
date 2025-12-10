'use client';
import { Button, ProfileImage } from '@/components/atoms';
import { ProfileInfo } from './ProfileInfo';
import { UserProfileStats } from './UserProfileStats';
import { addDashes } from '@/utils/formatPhoneNumber';
import { UserDatatype } from '@/types/authType';
import { useQuery } from '@tanstack/react-query';
import { checkFollow } from '@/api/profile';
import { SocialActionButton } from '../../../_components/SocialActionButton';
import Loading from '@/components/atoms/loading/Loading';
import { useMediaQuery } from '@/hooks/useMediaQuery';
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
  const formattedNumber = phoneNumber && addDashes(phoneNumber);

  const isDesktop = useMediaQuery('(min-width:1024px)');

  const { data, isLoading } = useQuery({
    queryKey: ['checkFollow'],
    queryFn: () => checkFollow(id),
    enabled: !!loggedInUserId,
  });
  if (isLoading) {
    return <Loading />;
  }
  const UserInfoSection = (
    <div className='flex items-center gap-4 lg:flex-col'>
      <ProfileImage size={isDesktop ? 100 : 60} src={profileImage} />
      <ProfileInfo
        nickname={nickname}
        email={email}
        phoneNumber={formattedNumber}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
  const StatsSection = (
    <UserProfileStats
      isLoggedIn={!!loggedInUserId}
      id={id}
      nickname={nickname}
      isOwnProfile={isOwnProfile}
      postCount={postCount}
      followerCount={followerCount}
      followingCount={followingCount}
    />
  );
  const ActionButtonSection = isOwnProfile ? (
    <Button size={'mini'} onClick={handler}>
      {isDesktop ? '내 프로필 수정하기' : '수정'}
    </Button>
  ) : (
    <SocialActionButton
      id={id}
      isConnected={loggedInUserId ? (data?.statusCode ? false : true) : false}
      type='follow'
    />
  );
  return (
    <div className='w-full'>
      <div className='hidden w-full gap-4 lg:flex lg:flex-col lg:items-center'>
        {UserInfoSection}
        {StatsSection}
        {ActionButtonSection}
      </div>
      <div className='flex w-full flex-col gap-4 lg:hidden'>
        <h2 className='text-center text-gray-800 subTitle-16'>
          {isOwnProfile ? '내' : userData.nickname + '님의'} 프로필
        </h2>

        <div className='flex w-full items-center justify-between'>
          {UserInfoSection}
          {ActionButtonSection}
        </div>
        {StatsSection}
      </div>
    </div>
  );
};
