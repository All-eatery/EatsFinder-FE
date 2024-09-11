import { ProfilePageProps } from '@/types/authType';
import { ProfileContents } from './ProfileContents';
import { UserProfile } from './UserProfile';

export const ProfilePage = ({ userData }: ProfilePageProps) => {
  return (
    <div className='flex flex-col gap-20'>
      <UserProfile userData={userData} />
      <ProfileContents />
    </div>
  );
};
