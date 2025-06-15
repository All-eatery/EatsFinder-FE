import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { getUserToken } from '@/utils/getServerUserInfo';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getUserToken();
    const keyword = req.nextUrl.searchParams.get('keyword');
    const filter = req.nextUrl.searchParams.get('filter');

    const res = await fetch(
      `${KOTLIN_SERVER}/search?keyword=${keyword}&filter=${filter}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      return new NextResponse(
        JSON.stringify({ message: 'Failed to fetch search results' }),
        {
          status: res.status,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[API ERROR]', err);
    return new NextResponse(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
