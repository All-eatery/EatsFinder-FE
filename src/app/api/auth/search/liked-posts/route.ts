import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('keyword');
  const cursorId = Number(searchParams.get('cursorId'));
  const pageSize = searchParams.get('pageSize');
  const cookiesStore = cookies();
  const token = cookiesStore.get('jwt');

  const response = await fetch(
    `${KOTLIN_SERVER}/search/liked-posts?keyword=${keyword}&cursorId=${cursorId}&pageSize=${pageSize}`,
    {
      method: 'GET',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token!.value}`,
      },
    },
  );
  const data = await response.json();
  return NextResponse.json(data);
};
