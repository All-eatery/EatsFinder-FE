'use client';
import { ProfileProps } from '@/types/authType';
import { Profile } from './Profile';
import { ProfileContents } from './ProfileContents';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/profile';

export const UserProfile = ({
  userId,
  loggedInUserId,
  isOwnProfile,
}: ProfileProps) => {
  const { data: userProfileData, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  });

  console.log('vmfhvlfvpdlwl', typeof userId);

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (userProfileData?.isSuccess) {
    console.log('유저데이터', userProfileData.data);
    const handler = () => {
      return console.log('팔로우 기능 생겨야해요');
    };
    return (
      <>
        <Profile
          loggedInUserId={loggedInUserId}
          handler={handler}
          userData={userProfileData.data}
          isOwnProfile={isOwnProfile}
        />
        <ProfileContents
          userData={userProfileData.data}
          isOwnProfile={isOwnProfile}
        />
      </>
    );
  } else {
    return <div>찾으시는 유저가 없습니다.</div>;
  }
};
