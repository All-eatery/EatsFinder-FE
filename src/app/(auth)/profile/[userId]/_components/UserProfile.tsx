'use client';
import { ProfilePageProps } from '@/types/authType';
import { Profile } from './Profile';
import { ProfileContents } from './ProfileContents';

export const UserProfile = ({
  loggedInUserId,
  userData,
  isOwnProfile,
}: ProfilePageProps) => {
  const handler = () => {
    return console.log('팔로우 기능 생겨야해요');
  };
  return (
    <>
      <Profile
        loggedInUserId={loggedInUserId}
        handler={handler}
        userData={userData}
        isOwnProfile={isOwnProfile}
      />
      <ProfileContents userData={userData} isOwnProfile={isOwnProfile} />
    </>
  );
};
