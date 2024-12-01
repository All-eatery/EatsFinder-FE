'use client';
import { useState, useMemo } from 'react';
import { FeedCard } from '@/components/molecules';
import { NextButton, PrevButton } from '@/components/atoms';
import { customTwMerge } from '@/utils/customTwMerge';
import { PostCard } from '@/types/postType';

const CARD_WIDTH = 250;
const MARGIN_LEFT = 29.5;
const NUMBER_PER_SCROLL = 5;

export const CardCarousel = ({ datas }: { datas: PostCard[] }) => {
  const [slide, setSlide] = useState(0);

  const maxSlide = useMemo(() => {
    return Math.floor(datas.length / NUMBER_PER_SCROLL);
  }, [datas.length]);

  const calculateTranslate = useMemo(() => {
    if (slide === maxSlide) {
      return (
        (datas.length -
          NUMBER_PER_SCROLL * slide +
          NUMBER_PER_SCROLL * (slide - 1)) *
        (CARD_WIDTH + MARGIN_LEFT)
      );
    }
    return (CARD_WIDTH + MARGIN_LEFT) * NUMBER_PER_SCROLL * slide;
  }, [slide, maxSlide, datas.length]);

  const handleNext = () => {
    if (slide === maxSlide - 1) return;
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
          {datas.map((data) => {
            return (
              <div key={data.postId} className='mr-[29.5px]'>
                <FeedCard {...data} />
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
          slide === maxSlide - 1 && 'hidden',
        )}
      >
        <NextButton onClick={handleNext} />
      </div>
    </div>
  );
};
