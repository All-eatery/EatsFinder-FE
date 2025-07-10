import Image from 'next/image';
import { Checkbox } from '@/components/atoms';
import { OfficialLogoSVG } from '@/components/svg/OfficialLogoSVG';
import { RatingStarSVG } from '@/components/svg/RatingstarSVG';
import { PlaceDetail } from '@/types/placeType';

interface CardProps {
  place: PlaceDetail;
}

export const Card = ({ place }: CardProps) => {
  return (
    <div className='w-[250px]'>
      <div className='relative mb-2 h-[250px] overflow-hidden rounded-[24px] bg-gray-400'>
        <Checkbox variant='bookmark' className='absolute right-5 top-5' />
        {place.posts[0]?.thumbnailUrl && (
          <Image
            src={place.posts[0].thumbnailUrl}
            width={250}
            height={250}
            alt={place.name}
          />
        )}
      </div>
      <div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-gray-800 subTitle-20'>
            <span className='mr-1'>{place.name}</span>
            <span>{OfficialLogoSVG()}</span>
          </div>
          <span className='text-gray-500 body-14'>{place.categories.name}</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-gray-500 body-14'>{place.roadAddress}</span>
          <div className='flex items-center gap-1 text-primary-400 subTitle-20'>
            <span>{RatingStarSVG({ isFill: 'fill' })}</span>
            <span>{place.starRatings}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
