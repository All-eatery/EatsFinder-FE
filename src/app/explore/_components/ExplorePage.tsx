import { Search } from '@/components/molecules';
import { RealTimeTrendingPosts } from './RealTimeTrendingPosts';
import { RecentPosts } from './RecentPosts';

export const ExplorePage = () => {
  return (
    <div className='flex flex-col gap-20'>
      <Search
        variant={'large'}
        placeholder='오늘 어떤 음식을 드실 예정인가요?'
      />
      <RealTimeTrendingPosts />
      <RecentPosts />
    </div>
  );
};
