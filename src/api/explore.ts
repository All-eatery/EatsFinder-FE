import { KOTLIN_SERVER, NEST_SERVER } from '@/constants/baseUrl';
import { getUserToken } from '@/utils/getServerUserInfo';

export const getNewNeighborPosts = async () => {
  const token = await getUserToken();
  const response = await fetch(
    `${KOTLIN_SERVER}/posts/follows?page=0&size=20&sort=string`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data;
};

export const getAllPosts = async (cursor: number, size: number) => {
  const token = await getUserToken();

  const response = await fetch(
    `${NEST_SERVER}/posts?cursor=${cursor}&size=${size}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data;
};
