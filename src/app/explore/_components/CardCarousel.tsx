'use client';
import { useState, useMemo } from 'react';
import { FeedCard } from '@/components/molecules';
import { NextButton, PrevButton } from '@/components/atoms';
import { customTwMerge } from '@/utils/customTwMerge';
import { PostCard } from '@/app/(auth)/myeats/_components/like/PostCard';
import { sampleImg } from '@/app/(auth)/profile/[userId]/_components/FollowList';

const CARD_WIDTH = 250;
const MARGIN_LEFT = 29.5;
const NUMBER_PER_SCROLL = 5;

export const CardCarousel = ({
  data,
  title,
}: {
  data: number[];
  title: string;
}) => {
  const [slide, setSlide] = useState(0);

  const maxSlide = useMemo(() => {
    return Math.floor(data.length / NUMBER_PER_SCROLL);
  }, [data.length]);

  const calculateTranslate = useMemo(() => {
    if (slide === maxSlide) {
      return (
        (data.length -
          NUMBER_PER_SCROLL * slide +
          NUMBER_PER_SCROLL * (slide - 1)) *
        (CARD_WIDTH + MARGIN_LEFT)
      );
    }
    return (CARD_WIDTH + MARGIN_LEFT) * NUMBER_PER_SCROLL * slide;
  }, [slide, maxSlide, data.length]);

  const handleNext = () => {
    if (slide === maxSlide) return;
    setSlide((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (slide === 0) return;
    setSlide((prev) => prev - 1);
  };

  return (
    <div>
      <h2 className='my-3 text-gray-700 subTitle-28'>{title}</h2>

      <div className='relative'>
        <div className='overflow-hidden'>
          <div
            className='flex transition-transform duration-700'
            style={{ transform: `translate3d(${-calculateTranslate}px, 0, 0)` }}
          >
            {data.map((_, idx) => {
              return (
                <div key={idx} className='mr-[29.5px]'>
                  <PostCard
                    id={1}
                    isLiked={true}
                    nickname='ddd'
                    src={sampleImg}
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
