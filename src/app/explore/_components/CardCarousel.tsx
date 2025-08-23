'use client';
import { useState, useMemo } from 'react';
import { NextButton, PrevButton } from '@/components/atoms';
import { customTwMerge } from '@/utils/customTwMerge';
import { PostCard } from '@/app/(auth)/myeats/_components/like/PostCard';
import { PostCardType } from '@/types/postType';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const CardCarousel = ({
  data,
  title,
}: {
  data: PostCardType[];
  title: string;
}) => {
  const isXl = useMediaQuery('(min-width: 1280px)');
  const isLg = useMediaQuery('(min-width: 1024px)');
  const isMd = useMediaQuery('(min-width: 768px)');
  const isSm = useMediaQuery('(min-width: 640px)');

  const settings = useMemo(() => {
    if (isXl) {
      return {
        cardWidth: 250,
        cardsPerView: 5,
        cardsPerScroll: 5,
        gap: 29.5,
      };
    } else if (isLg) {
      return {
        cardWidth: 210,
        cardsPerView: 4,
        cardsPerScroll: 4,
        gap: 20,
      };
    } else if (isMd) {
      return {
        cardWidth: 178,
        cardsPerView: 3,
        cardsPerScroll: 3,
        gap: 12,
      };
    } else if (isSm) {
      return {
        cardWidth: 160,
        cardsPerView: 2,
        cardsPerScroll: 2,
        gap: 12,
      };
    }
    return {
      cardWidth: 160,
      cardsPerView: 2,
      cardsPerScroll: 2,
      gap: 12,
    };
  }, [isXl, isLg, isMd, isSm]);

  const [slide, setSlide] = useState(0);
  const maxSlide = useMemo(() => {
    return Math.ceil(data.length / settings.cardsPerScroll) - 1;
  }, [data.length, settings.cardsPerScroll]);

  const calculateTranslate = useMemo(() => {
    const totalMoveWidth = settings.cardWidth + settings.gap;
    return totalMoveWidth * settings.cardsPerScroll * slide;
  }, [slide, settings]);
  const handleNext = () => {
    if (slide >= maxSlide) return;
    setSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (slide === 0) return;
    setSlide((prev) => prev - 1);
  };

  return (
    <div>
      <h2 className='my-3 text-gray-700 subTitle-18 xl:subTitle-28'>{title}</h2>
      <div className='relative'>
        <div className='overflow-hidden'>
          <div
            className='flex transition-transform duration-700 ease-in-out'
            style={{ transform: `translate3d(${-calculateTranslate}px, 0, 0)` }}
          >
            {data.map((data) => {
              return (
                <div
                  key={data.postId}
                  style={{ marginRight: `${settings.gap}px` }}
                >
                  <PostCard
                    id={data.postId}
                    isLiked={data.isPostLike}
                    nickname={data.nickname}
                    src={data.postThumbnailUrl}
                    profileImage={data.profileImage}
                    variant='explore'
                  />
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
            slide === maxSlide && 'hidden',
          )}
        >
          <NextButton onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
