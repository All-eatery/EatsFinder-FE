import { RatingStarSVG } from '@/components/svg/RatingstarSVG';

export const Rating = ({ rating }: { rating: number }) => {
  return (
    <div className='flex items-center gap-1'>
      <RatingStarSVG size={18} />
      <span className='text-primary-400 subTitle-20'>{rating}</span>
    </div>
  );
};
