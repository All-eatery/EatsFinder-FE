'use client';
import { getLoggedInUserProfile, getUserProfile } from '@/api/profile';
import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { MyProfile } from './MyProfile';
import { UserProfile } from './UserProfile';
import { useQuery } from '@tanstack/react-query';
type Props = {
  userId: number;
  loggedInUserId?: number;
};
export const ProfilePage = ({ userId, loggedInUserId }: Props) => {
  if (loggedInUserId && loggedInUserId == userId) {
    const { data: userProfileData, isLoading } = useQuery({
      queryKey: ['userProfile', userId],
      queryFn: () => getLoggedInUserProfile(),
    });
    if (isLoading) {
      return <div>로딩중</div>;
    }
    if (userProfileData)
      return <MyProfile userData={userProfileData} isOwnProfile={true} />;
  }
  const { data: userProfileData, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  });
  // if (currentUser && currentUser?.id == userId) {
  //   return <MyProfile userData={currentUser} isOwnProfile={true} />;
  // }
  console.log('vmfhvlfvpdlwl', typeof userId);

  if (isLoading) {
    return <div>로딩중</div>;
  }
  // const userProfileData = await getUserProfile(userId);
  if (userProfileData?.isSuccess) {
    console.log('유저데이터', userProfileData.data);

    return (
      <UserProfile
        userData={userProfileData.data}
        loggedInUserId={loggedInUserId}
        isOwnProfile={false}
      />
    );
  } else {
    return <div>찾으시는 유저가 없습니다.</div>;
  }
};
