import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get('jwt');

  const response = await fetch(`${KOTLIN_SERVER}/users`, {
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token!.value}`,
    },
  });
  const data = await response.json();
  return NextResponse.json({ success: true, data });
};
