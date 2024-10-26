import { FollowType } from '@/types/authType';

export const checkFollowStatus = (
  profileFollowingList: FollowType[],
  myFollowingList: FollowType[],
) => {
  return profileFollowingList.map((profileUser) => ({
    ...profileUser,
    isFollowed: myFollowingList.some(
      (myUser) =>
        myUser.followingUserNickname === profileUser.followingUserNickname,
    ),
  }));
};
