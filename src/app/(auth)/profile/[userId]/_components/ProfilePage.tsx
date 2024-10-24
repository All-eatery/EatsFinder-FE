import { getUserProfile } from '@/api/profile';
import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { MyProfile } from './MyProfile';
import { UserProfile } from './UserProfile';
type Props = {
  userId: number;
};
export const ProfilePage = async ({ userId }: Props) => {
  const currentUser = await getServerUserInfo();

  if (currentUser && currentUser?.id == userId) {
    return <MyProfile userData={currentUser} isOwnProfile={true} />;
  }
  const userProfileData = await getUserProfile(userId);
  if (userProfileData.isSuccess) {
    return <UserProfile userData={userProfileData.data} isOwnProfile={false} />;
  } else {
    return <div>찾으시는 유저가 없습니다.</div>;
  }
};
