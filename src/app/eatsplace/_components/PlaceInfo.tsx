import Image from 'next/image';
import { Chip } from '@/components/atoms';
import { PlaceInfoProps } from '@/types/eatsPlaceType';
import { BookmarkButton } from '@/app/(auth)/_components/BookmarkButton';
export const PlaceInfo = ({ popular, url, placeName, id }: PlaceInfoProps) => {
  return (
    <div className='mb-6 flex w-full flex-col items-center gap-4 lg:gap-6'>
      <figure className='relative h-[150px] w-[150px] overflow-hidden rounded-full lg:h-[250px] lg:w-[250px]'>
        <Image src={url} alt='리스트 맛집 이미지' fill />
      </figure>
      <div className='gpa-1 flex items-center'>
        <p className='text-primary-400 subTitle-20 lg:subTitle-28'>
          #{placeName}
        </p>
        <BookmarkButton placeId={id} isMarked={false} />
      </div>
      <div className='flex items-center gap-2'>
        <div className='flex items-center rounded-xl bg-primary-400 px-2'>
          <p className='whitespace-nowrap font-pretendard text-sm leading-[135%] text-white'>
            인기
          </p>
        </div>
        <div className='flex gap-1'>
          {popular?.map((menu, idx) => <Chip text={menu} key={idx} />)}
        </div>
      </div>
    </div>
  );
};
