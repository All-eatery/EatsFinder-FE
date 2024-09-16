import { Chip, Point } from '@/components/atoms';
import { RatingStarSVG } from '@/components/svg/RatingstarSVG';

interface StoreInfoProps {
  name: string;
  starRatings: number;
  category: string;
}

const StoreInfo = ({ name, starRatings, category }: StoreInfoProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <span className='text-gray-600 body-16'>추천 맛집</span>
      <div className='flex gap-4'>
        <div className='flex items-center gap-2'>
          <h2 className='text-gray-600 subTitle-24'>{name}</h2>
          <div className='text-gray-300 subTitle-24'>{`(${category})`}</div>
        </div>
        <div className='flex items-center gap-1 text-primary-400 subTitle-20'>
          <span className='[&>svg]:w-[18px]'>
            <RatingStarSVG />
          </span>
          <span>{starRatings}</span>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
