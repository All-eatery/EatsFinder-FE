export const dynamic = 'force-dynamic'; //좋아요 업데이트를 위해 한 부분이지만 비용이큼 차라리 query로?
import { Search } from '@/components/molecules';
import { RecentPosts } from './RecentPosts';
import { getServerUserInfo } from '@/utils/getServerUserInfo';
import { CardCarousel } from './CardCarousel';
import { NeighborCarousel } from './NeighborCarousel';
import { getPopularPosts } from '@/api/post';

export const ExplorePage = async () => {
  const isLoggedIn = await getServerUserInfo();
  const popularPosts = await getPopularPosts();
  return (
    <div className='flex flex-col gap-2 xl:gap-14'>
      <Search
        variant={'large'}
        placeholder='오늘 어떤 음식을 드실 예정인가요?'
      />
      <div className='flex flex-col gap-8 xl:gap-20'>
        {isLoggedIn && <NeighborCarousel />}
        <CardCarousel data={popularPosts} title='실시간 인기 게시물' />
        <RecentPosts />
      </div>
    </div>
  );
};
