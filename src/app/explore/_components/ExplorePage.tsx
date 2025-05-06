import { Search } from '@/components/molecules';
import React from 'react';
import { RecentPosts } from './RecentPosts';
import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { CardCarousel } from './CardCarousel';
import { NeighborCarousel } from './NeighborCarousel';
const data = new Array(23).fill(0);

export const ExplorePage = async () => {
  const isLoggedIn = await getServerUserInfo();
  return (
    <div className='flex flex-col gap-20'>
      <Search
        variant={'large'}
        placeholder='오늘 어떤 음식을 드실 예정인가요?'
      />
      {isLoggedIn && <NeighborCarousel />}
      <CardCarousel data={data} title='실시간 인기 게시물' />
      <RecentPosts />
    </div>
  );
};
