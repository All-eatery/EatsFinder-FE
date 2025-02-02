import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { checkFollowStatus } from '@/utils/checkFollowStatus';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const profileId = Number(searchParams.get('profileId'));
  const myId = Number(searchParams.get('myId'));
  const follow = searchParams.get('follow');
  console.log('req', profileId, myId, follow);
  const response1 = await fetch(
    `${KOTLIN_SERVER}/${follow}?userId=${profileId}`,
    {
      method: 'GET',
    },
  );
  const data1 = await response1.json();
  const response2 = await fetch(`${KOTLIN_SERVER}/following?userId=${myId}`, {
    method: 'GET',
  });
  if (!myId) {
    return NextResponse.json(checkFollowStatus(data1, []));
  }
  const data2 = await response2.json();
  console.log('data1', data1, '@@@@@@@@@@@@@@@@@', data2);

  return NextResponse.json(checkFollowStatus(data1, data2));
};
