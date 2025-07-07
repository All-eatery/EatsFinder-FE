'use client';
import { useState, useMemo } from 'react';
import { NextButton, PrevButton } from '@/components/atoms';
import { customTwMerge } from '@/utils/customTwMerge';

const CARD_WIDTH = 250;
const MARGIN_LEFT = 29.5;
const NUMBER_PER_SCROLL = 5;

interface CardCarouselProps<T, P extends { id: string | number }> {
  title?: string;
  data: T[];
  RenderCard: React.FC<P>;
  mapData: (item: T) => P;
}

export const CardCarousel = <T, P extends { id: string | number }>({
  title,
  data,
  RenderCard,
  mapData,
}: CardCarouselProps<T, P>) => {
  const [slide, setSlide] = useState(0);

  const maxSlide = useMemo(
    () => Math.floor(data.length / NUMBER_PER_SCROLL),
    [data.length],
  );

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

  const handleNext = () => slide < maxSlide && setSlide((prev) => prev + 1);
  const handlePrev = () => slide > 0 && setSlide((prev) => prev - 1);

  return (
    <>
      {title && <h2 className='my-3 text-gray-700 subTitle-28'>{title}</h2>}
      <div className='relative'>
        <div className='overflow-hidden'>
          <div
            className='flex transition-transform duration-700'
            style={{ transform: `translate3d(${-calculateTranslate}px, 0, 0)` }}
          >
            {data.map((item) => {
              const props = mapData(item);
              return (
                <div key={props.id} className='mr-[29.5px]'>
                  <RenderCard {...props} />
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
    </>
  );
};
