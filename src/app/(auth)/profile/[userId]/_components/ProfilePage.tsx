'use client';
import { getUserProfile } from '@/api/profile';
import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { MyProfile } from './MyProfile';
import { UserProfile } from './UserProfile';
import { useQuery } from '@tanstack/react-query';
type Props = {
  userId: number;
  loggedInUserId?: number;
};
export const ProfilePage = ({ userId, loggedInUserId }: Props) => {
  // const currentUser = await getServerUserInfo();

  // if (loggedInUserId && loggedInUserId == userId) {
  //   return <MyProfile userData={currentUser} isOwnProfile={true} />;
  // }
  // if (currentUser && currentUser?.id == userId) {
  //   return <MyProfile userData={currentUser} isOwnProfile={true} />;
  // }
  console.log('vmfhvlfvpdlwl', typeof userId);
  const { data: userProfileData, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => getUserProfile(userId),
  });
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
