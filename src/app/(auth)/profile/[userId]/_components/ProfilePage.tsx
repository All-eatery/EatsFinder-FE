import {
  getMyActives,
  getMyfeeds,
  getUserFeeds,
  getUserProfile,
} from '@/api/profile';
import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { MyProfile } from './MyProfile';
import { UserProfile } from './UserProfile';
type Props = {
  userId: string;
};
export const ProfilePage = async ({ userId }: Props) => {
  const currentUser = await getServerUserInfo();
  // const feeds = await getMyfeeds();
  // const act = await getMyActives();
  // console.log('피드', feeds);
  // console.log('액트', act);
  // const user = await getUserFeeds(userId);
  // console.log(user);
  if (currentUser && String(currentUser?.id) === userId) {
    return <MyProfile userData={currentUser} isOwnProfile={true} />;
  }
  const userProfileData = await getUserProfile(userId);
  if (userProfileData.isSuccess) {
    console.log(userProfileData.isSuccess);
    return <UserProfile userData={userProfileData.data} isOwnProfile={false} />;
  } else {
    console.log(userProfileData.isSuccess);
    return <div>찾으시는 유저가 없습니다.</div>;
  }
};
