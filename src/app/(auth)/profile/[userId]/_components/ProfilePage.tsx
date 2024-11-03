'use client';
import { getLoggedInUserProfile, getUserProfile } from '@/api/profile';
import { MyProfile } from './MyProfile';
import { UserProfile } from './UserProfile';
import { useQuery } from '@tanstack/react-query';
type Props = {
  userId: number;
  loggedInUserId?: number;
};
export const ProfilePage = ({ userId, loggedInUserId }: Props) => {
  if (loggedInUserId && loggedInUserId == userId) {
    return <MyProfile userId={userId} isOwnProfile={true} />;
  }

  return (
    <UserProfile
      userId={userId}
      loggedInUserId={loggedInUserId}
      isOwnProfile={false}
    />
  );
};
