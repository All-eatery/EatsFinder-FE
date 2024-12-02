import { ProfileProps } from '@/types/authType';
import { CurrentUserProfile } from './CurrentUserProfile';
import { ProfileContents } from './ProfileContents';
import { useQuery } from '@tanstack/react-query';
import { getLoggedInUserProfile } from '@/api/profile';
import Loading from '@/components/atoms/loading/Loading';

export const MyProfile = ({ isOwnProfile, userId }: ProfileProps) => {
  const { data: userProfileData, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getLoggedInUserProfile(),
  });
  console.log('myprofile$#@%$#@^%#$&^^&($#%$#^UIO(*&^%$#HJGFMKIU(KR^ETGW');
  if (isLoading) return <Loading />;

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
