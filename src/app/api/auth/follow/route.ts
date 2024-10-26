import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { FollowType } from '@/types/authType';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const profileId = 1;
  const myId = 12;
  // const getFollowing = async (id: number): Promise<FollowType[]> => {
  const response1 = await fetch(
    `${KOTLIN_SERVER}/following?userId=${profileId}`,
    {
      method: 'GET',
    },
  );
  const data1 = await response1.json();
  console.log(data1);
  const response2 = await fetch(`${KOTLIN_SERVER}/following?userId=${myId}`, {
    method: 'GET',
  });
  const data2 = await response2.json();
  console.log(data2);
  const result = { profileFollow: data1, myFollow: data2 };
  return NextResponse.json(result); // };
};
