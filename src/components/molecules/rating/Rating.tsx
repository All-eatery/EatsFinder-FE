'use client';
import { useState } from 'react';
import { RatingStarSVG } from '@/components/svg/RatingstarSVG';
import { customTwMerge } from '@/utils/customTwMerge';

interface RatingProps {
  number: number;
  rating: number;
  onStarRatingChange: (rating: number) => void;
}

export const Rating = ({ number, rating, onStarRatingChange }: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<null | number>(null);

  return (
    <div className='flex gap-3' onMouseLeave={() => setHoverValue(null)}>
      {Array.from({ length: number }).map((_, idx) => {
        return (
          <label
            key={idx}
            className='cursor-pointer'
            onMouseEnter={() => setHoverValue(idx)}
          >
            <input
              type='radio'
              className='sr-only'
              onClick={() => onStarRatingChange(idx + 1)}
              aria-label='rating'
            />
            <span className={customTwMerge('[&>svg]:h-10 [&>svg]:w-10')}>
              {(hoverValue !== null ? hoverValue >= idx : rating > idx) ? (
                <RatingStarSVG />
              ) : (
                <RatingStarSVG isFill='empty' />
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
};
