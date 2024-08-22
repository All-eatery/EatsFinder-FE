import { Chip, Point } from '@/components/atoms';
import { RatingStarSVG } from '@/components/svg/RatingstarSVG';

interface StoreInfoProps {
  name: string;
  starRatings: number;
  menuTag: string[];
}

const StoreInfo = ({ name, starRatings, menuTag }: StoreInfoProps) => {
  return (
    <div>
      <div className='flex h-20 items-center'>
        <div className='grid w-full grid-cols-2 divide-x divide-gray-100'>
          <div className='flex items-center justify-center gap-2'>
            <div className='text-gray-700 subTitle-20'>{name}</div>
            <div>
              <Point text={name} size='small' />
            </div>
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='flex items-center gap-1 text-primary-400 subTitle-20'>
              <span>
                <RatingStarSVG />
              </span>
              <span>{starRatings}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='mb-2'>
          <span className='text-gray-600 body-16'>추천 메뉴</span>
        </div>
        <div className='flex h-24 flex-wrap items-start gap-2'>
          {menuTag.map((menu) => (
            <Chip key={menu} text={menu} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;
