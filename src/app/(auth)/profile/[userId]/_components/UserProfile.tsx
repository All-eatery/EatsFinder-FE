'use client';
import { ProfileProps } from '@/types/authType';
import { Profile } from './Profile';
import { ProfileContents } from './ProfileContents';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/profile';
import Loading from '@/components/atoms/loading/Loading';

export const UserProfile = ({
  userId,
  loggedInUserId,
  isOwnProfile,
}: ProfileProps) => {
  const { data: userProfileData, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  });

  if (isLoading) {
    return <Loading />;
  }
  if (userProfileData?.isSuccess) {
    return (
      <div className='w-full'>
        <Profile
          loggedInUserId={loggedInUserId}
          userData={userProfileData.data}
          isOwnProfile={isOwnProfile}
        />
        <ProfileContents
          userData={userProfileData.data}
          isOwnProfile={isOwnProfile}
        />
      </div>
    );
  } else {
    return <div>찾으시는 유저가 없습니다.</div>;
  }
};
