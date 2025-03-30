import { ButtonHTMLAttributes } from 'react';
import { customTwMerge } from '@/utils/customTwMerge';
import { ArrowSVG } from '@/components/svg/ArrowSVG';

export const NextButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={customTwMerge(
        'flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.1)]',
        className,
      )}
      type='button'
      aria-label='next slide'
      {...props}
    >
      <div className='fill-primary-400 align-middle [&>svg]:h-10 [&>svg]:w-10'>
        <ArrowSVG direction='right' color='orange' />
      </div>
    </button>
  );
};

export const PrevButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={customTwMerge(
        'flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.1)]',
        className,
      )}
      type='button'
      aria-label='prev slide'
      {...props}
    >
      <div className='fill-primary-400 [&>svg]:h-10 [&>svg]:w-10'>
        <ArrowSVG direction='left' color='orange' />
      </div>
    </button>
  );
};
