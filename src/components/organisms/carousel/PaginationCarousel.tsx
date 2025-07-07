'use client';
import { useState, useMemo, useEffect } from 'react';
import { FeedCard, SkeletonFeedCard } from '@/components/molecules';
import { NextButton, PrevButton } from '@/components/atoms';
import { customTwMerge } from '@/utils/customTwMerge';
import { getFollowsPosts } from '@/api/post';
import { NeighborPost, Pagination } from '@/types/postType';

const CARD_WIDTH = 250;
const MARGIN_LEFT = 29.5;
const NUMBER_PER_SCROLL = 5;

export const PagenationCarousel = () => {
  const [slide, setSlide] = useState(0);
  const [posts, setPosts] = useState<(NeighborPost | null)[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  const updateFollowsPosts = async (slide: number) => {
    const temp = Array.from({ length: 5 }).map((_) => null);
    setPosts((prev) => [...prev, ...temp]);

    const data: {
      pagination: Pagination;
      neighborPost: NeighborPost[];
    } = await getFollowsPosts(slide);

    setPagination(data.pagination);
    setPosts((prev) => [
      ...prev.slice(0, prev.length - 5),
      ...data.neighborPost,
    ]);
  };

  useEffect(() => {
    updateFollowsPosts(slide);
  }, [slide]);

  const calculateTranslate = useMemo(() => {
    if (pagination && pagination.isLastPage) {
      return (
        (posts.length -
          NUMBER_PER_SCROLL * slide +
          NUMBER_PER_SCROLL * (slide - 1)) *
        (CARD_WIDTH + MARGIN_LEFT)
      );
    }
    return (CARD_WIDTH + MARGIN_LEFT) * NUMBER_PER_SCROLL * slide;
  }, [slide, posts.length]);

  const handleNext = () => {
    if (pagination?.isLastPage) return;
    setSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (slide === 0) return;
    setSlide((prev) => prev - 1);
  };

  return (
    <div className='relative'>
      <div className='overflow-hidden'>
        <div
          className='flex transition-transform duration-700'
          style={{ transform: `translate3d(${-calculateTranslate}px, 0, 0)` }}
        >
          {posts.map((post, idx) => {
            return (
              <div key={idx} className='mr-[29.5px]'>
                {post === null ? <SkeletonFeedCard /> : <FeedCard />}
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={customTwMerge(
          'absolute top-1/2 -translate-y-1/2',
          slide === 0 && 'hidden',
        )}
      >
        <PrevButton onClick={handlePrev} />
      </div>
      <div
        className={customTwMerge(
          'absolute right-0 top-1/2 -translate-y-1/2',
          pagination?.isLastPage && 'hidden',
        )}
      >
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
};
