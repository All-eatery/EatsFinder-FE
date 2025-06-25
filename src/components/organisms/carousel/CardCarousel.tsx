'use client';
import React, { useState, useMemo } from 'react';
import { NextButton, PrevButton } from '@/components/atoms';
import { customTwMerge } from '@/utils/customTwMerge';

const CARD_WIDTH = 250;
const MARGIN_LEFT = 29.5;
const NUMBER_PER_SCROLL = 5;

export const CardCarousel = ({
  data,
  children,
}: {
  data: number[];
  children: React.ReactNode;
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
    <div className='relative'>
      <div className='overflow-hidden'>
        <div
          className='flex transition-transform duration-700'
          style={{ transform: `translate3d(${-calculateTranslate}px, 0, 0)` }}
        >
          {data.map((_, idx) => {
            return (
              <div key={idx} className='mr-[29.5px]'>
                {children}
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
  );
};
