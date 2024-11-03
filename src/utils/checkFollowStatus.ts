import { FollowDataType, FollowingDataType } from '@/types/authType';

export const checkFollowStatus = (
  profileFollowList: FollowDataType[],
  myFollowingList: FollowingDataType[],
) => {
  return profileFollowList.map((profileUser) => {
    const isFollowingType = 'followingUserNickname' in profileUser;

    const formattedProfileUser = {
      ...profileUser,
      followUserNickname: isFollowingType
        ? (profileUser as { followingUserNickname: string })
            .followingUserNickname
        : (profileUser as { followerUserNickname: string })
            .followerUserNickname,
      followUserId: isFollowingType
        ? (profileUser as { followingUserId: string }).followingUserId
        : (profileUser as { followerUserId: string }).followerUserId,
    };

    if (isFollowingType) {
      delete (formattedProfileUser as { followingUserNickname?: string })
        .followingUserNickname;
      delete (formattedProfileUser as { followingUserId?: string })
        .followingUserId;
    } else {
      delete (formattedProfileUser as { followerUserNickname?: string })
        .followerUserNickname;
      delete (formattedProfileUser as { followerUserId?: string })
        .followerUserId;
    }

    return {
      ...formattedProfileUser,
      isFollowed: myFollowingList.some((myUser) =>
        isFollowingType
          ? myUser.followingUserNickname ===
            formattedProfileUser.followUserNickname
          : myUser.followingUserNickname ===
            formattedProfileUser.followUserNickname,
      ),
    };
  });
};
