'use client';
import { useState } from 'react';
import { Button } from '@/components/atoms';
import { HomeSection, FeedCard } from '@/components/molecules';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetFollowsPosts } from '../_hooks/useGetFollowsPosts';

const FollowsPost = () => {
  const [requestCount, setRequestCount] = useState(0);

  const { data, isLoading, fetchNextPage } = useGetFollowsPosts();
  const followsPosts = data?.pages.at(-1)?.neighborPost;

  const getNextPageFollowsPosts = () => {
    setRequestCount((prev) => prev + 1);
    fetchNextPage();
  };

  const handleGetMoreFollowsPosts = () => {
    setRequestCount(0);
    fetchNextPage();
  };

  const obCallbackRef = useInfiniteScroll(getNextPageFollowsPosts);

  return (
    <HomeSection title='이웃들의 새로운 게시물'>
      {followsPosts && followsPosts.length === 0 ? (
        <div className='flex h-[250px] flex-col items-center justify-center gap-6'>
          <div className='subTitle-20'>
            이웃들을 팔로우하고 새로운 소식을 받아보세요
          </div>
          <Button size='medium'>피드 둘러보기</Button>
        </div>
      ) : (
        <>
          <div>
            <FeedCard />
          </div>
          <div>
            {!isLoading && requestCount < 3 ? (
              <div ref={obCallbackRef} className='h-20'></div>
            ) : (
              <Button onClick={handleGetMoreFollowsPosts}>더보기</Button>
            )}
          </div>
        </>
      )}
    </HomeSection>
  );
};

export default FollowsPost;
