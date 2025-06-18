import { Search } from '@/components/molecules';
import React from 'react';
import { RecentPosts } from './RecentPosts';
import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { CardCarousel } from './CardCarousel';
import { NeighborCarousel } from './NeighborCarousel';
import { getPopularPosts } from '@/api/post';
import { getNewNeighborPosts } from '@/api/explore';

export const ExplorePage = async () => {
  const isLoggedIn = await getServerUserInfo();
  const popularPosts = await getPopularPosts();
  const neighborPosts = await getNewNeighborPosts();
  return (
    <div className='flex flex-col gap-20'>
      <Search
        variant={'large'}
        placeholder='오늘 어떤 음식을 드실 예정인가요?'
      />
      {isLoggedIn && <NeighborCarousel />}
      <CardCarousel data={popularPosts} title='실시간 인기 게시물' />
      <RecentPosts />
    </div>
  );
};
