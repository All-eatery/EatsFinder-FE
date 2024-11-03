import { ProfileProps } from '@/types/authType';
import { CurrentUserProfile } from './CurrentUserProfile';
import { ProfileContents } from './ProfileContents';
import { useQuery } from '@tanstack/react-query';
import { getLoggedInUserProfile } from '@/api/profile';

export const MyProfile = ({ isOwnProfile, userId }: ProfileProps) => {
  const { data: userProfileData, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getLoggedInUserProfile(),
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }
  console.log('ddd', isOwnProfile);

  return (
    <>
      <CurrentUserProfile
        userData={userProfileData!}
        isOwnProfile={isOwnProfile}
      />
      <ProfileContents
        userData={userProfileData!}
        isOwnProfile={isOwnProfile}
      />
    </>
  );
};
