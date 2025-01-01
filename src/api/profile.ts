import { KOTLIN_SERVER } from '@/constants/baseUrl';
import {
  FollowAPIType,
  FollowStatusType,
  FollowDataType,
  PaginationFeedType,
  UserDatatype,
  PaginationActiveType,
} from '@/types/authType';
import { getServerUserInfo, getUserToken } from '@/utils/getServerUserInfo';
type Result<T, E> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: E };

export const getUserProfile = async (
  id: number,
): Promise<Result<UserDatatype, string>> => {
  try {
    const response = await fetch(`${KOTLIN_SERVER}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.statusCode) {
      return { isSuccess: false, error: '존재하지 않는 유저입니다' };
    }
    return { isSuccess: true, data };
  } catch (error) {
    return { isSuccess: false, error: '유저정보조회 에러' };
  }
};
export const getLoggedInUserProfile = async (): Promise<UserDatatype> => {
  const token = await getUserToken();

  const response = await fetch(`${KOTLIN_SERVER}/users`, {
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const getMyActives = async (
  filter: string,
  page: number,
): Promise<PaginationActiveType> => {
  const token = await getUserToken();
  console.log('!@32132143214', filter);
  const size = 10;
  const response = await fetch(
    `${KOTLIN_SERVER}/users/actives?filter=${filter}&page=${page}&size=${size}`,
    {
      method: 'GET',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data[0];
};
export const getUserFeeds = async ({
  id,
  page,
  isOwnProfile,
}: {
  id: number;
  page: number;
  isOwnProfile: boolean;
}): Promise<PaginationFeedType> => {
  const url = isOwnProfile ? 'users/feeds' : `users/feeds/${id}`;
  const token = await getUserToken();
  const headers: { accept: string; Authorization?: string } = {
    accept: '*/*',
  };
  if (isOwnProfile && token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const size = 10;
  const response = await fetch(
    `${KOTLIN_SERVER}/${url}?page=${page}&size=${size}`,
    {
      method: 'GET',
      headers,
    },
  );

  const data = await response.json();
  return data;
};
export const getFollowing = async (id: number): Promise<FollowDataType[]> => {
  const response = await fetch(`${KOTLIN_SERVER}/following?userId=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
export const getFollower = async (id: number) => {
  const response = await fetch(`${KOTLIN_SERVER}/follower?userId=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
export const getFollow = async ({
  profileId,
  follow,
}: FollowAPIType): Promise<FollowStatusType[]> => {
  const loginUser = await getServerUserInfo();
  const response = await fetch(
    `/api/auth/follow?profileId=${profileId}&myId=${loginUser?.id}&follow=${follow}`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  return data;
};

export const checkFollow = async (id: number) => {
  const token = await getUserToken();
  const response = await fetch(`${KOTLIN_SERVER}/follows?followUserId=${id}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
