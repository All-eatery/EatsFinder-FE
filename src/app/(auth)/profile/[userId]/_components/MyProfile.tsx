import { ProfilePageProps, UserProfile } from '@/types/authType';
import { CurrentUserProfile } from './CurrentUserProfile';
import { ProfileContents } from './ProfileContents';

export const MyProfile = ({ userData, isOwnProfile }: ProfilePageProps) => {
  console.log('ddd', isOwnProfile);

  return (
    <>
      <CurrentUserProfile userData={userData} isOwnProfile={isOwnProfile} />
      <ProfileContents userData={userData} isOwnProfile={isOwnProfile} />
    </>
  );
};
