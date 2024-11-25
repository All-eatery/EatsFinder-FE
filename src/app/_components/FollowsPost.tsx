'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms';
import { HomeSection, FeedCard } from '@/components/molecules';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { getFollowsPosts } from '@/api/post';

const FollowsPost = () => {
  const [page, setPage] = useState(1);
  const [followsPosts, setFollowsPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  const handleObserve = async () => {
    if (isLoading || requestCount > 2) return;

    setIsLoading(true);
    const data = await getFollowsPosts(page);
    setFollowsPosts(data.neighborPost);
    setPage((prev) => prev++);
    setRequestCount((prev) => prev++);
    setIsLoading(false);
  };

  useEffect(() => {
    handleObserve();
  }, []);

  const handleMoreClick = () => {
    setRequestCount(0);
  };

  const obCallbackRef = useInfiniteScroll(handleObserve);

  return (
    <HomeSection title='이웃들의 새로운 게시물'>
      {followsPosts.length === 0 ? (
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
            {!isLoading && requestCount < 4 ? (
              <div ref={obCallbackRef} className='h-20'></div>
            ) : (
              <Button onClick={handleMoreClick}>더보기</Button>
            )}
          </div>
        </>
      )}
    </HomeSection>
  );
};

export default FollowsPost;
