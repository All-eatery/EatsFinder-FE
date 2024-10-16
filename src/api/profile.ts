import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { Active, FeedType, FollowType, UserData } from '@/types/authType';
import { getUserToken } from '@/utils/getServerUserInfo';
type Result<T, E> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: E };

export const getUserProfile = async (
  id: number,
): Promise<Result<UserData, string>> => {
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
export const getMyfeeds = async (): Promise<FeedType[]> => {
  const token = await getUserToken();
  const response = await fetch(`${KOTLIN_SERVER}/users/feeds`, {
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
export const getMyActives = async (): Promise<Active[]> => {
  const token = await getUserToken();

  const response = await fetch(`${KOTLIN_SERVER}/users/actives`, {
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
export const getUserFeeds = async (id: number): Promise<FeedType[]> => {
  const response = await fetch(`${KOTLIN_SERVER}/users/feeds/${id}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
    },
  });

  const data = await response.json();
  console.log(data);
  return data;
};
export const getFollowing = async (id: number): Promise<FollowType[]> => {
  const response = await fetch(`${KOTLIN_SERVER}/following?userId=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  console.log(data);
  return data;
};
export const getFollower = async (id: number) => {
  const response = await fetch(`${KOTLIN_SERVER}/follower?userId=${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  console.log(data);
  return data;
};
