'use client';
import { ProfilePageProps } from '@/types/authType';
import { Profile } from './Profile';
import { ProfileContents } from './ProfileContents';

export const UserProfile = ({ userData, isOwnProfile }: ProfilePageProps) => {
  const handler = () => {
    return console.log('팔로우 버튼 생겨야해요');
  };
  return (
    <>
      <Profile
        handler={handler}
        userData={userData}
        isOwnProfile={isOwnProfile}
      />
      <ProfileContents userData={userData} isOwnProfile={isOwnProfile} />
    </>
  );
};
