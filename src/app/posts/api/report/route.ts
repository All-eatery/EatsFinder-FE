import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { getUserToken } from '@/utils/getServerUserInfo';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const token = await getUserToken();
  const reasons = await req.json();
  const targetType = req.nextUrl.searchParams.get('targetType');
  const targetId = req.nextUrl.searchParams.get('targetId');

  const res = await fetch(
    `${KOTLIN_SERVER}/reports/${targetType}/${targetId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...reasons, reason: '' }),
    },
  );

  if (res.status === 403) {
    return NextResponse.error();
  }

  const data = await res.json();

  return NextResponse.json(data);
}
