import { BookmarkButton } from '@/app/(auth)/_components/BookmarkButton';
import { sampleImg } from '@/app/(auth)/profile/[userId]/_components/FollowList';
import { Checkbox } from '@/components/atoms';
import Image from 'next/image';
interface BookmarkedPlaceCard {
  id: number;
  src: string;
  category: string;
  name: string;
  address: string;
  isSelect?: boolean;
  isSeleceted?: boolean;
}
export const BookmarkedPlaceCard = ({
  id,
  src,
  address,
  category,
  name,
  isSelect,
  isSeleceted,
}: BookmarkedPlaceCard) => {
  return (
    <div className='relative flex h-24 items-center lg:h-[185px] lg:p-[10px]'>
      {isSelect && (
        <div className='absolute left-1 top-1 z-10 lg:left-6 lg:top-6'>
          <Checkbox variant='Checkbox_Ver2' checked={isSeleceted} />
        </div>
      )}
      <div className='flex w-full gap-6 border-b-[1px] border-b-gray-50 p-2 lg:p-5 lg:pb-[25px]'>
        <figure className='relative h-20 w-20 overflow-hidden rounded-3xl lg:h-[120px] lg:w-[180px]'>
          <Image
            alt='게시글 이미지'
            src={src || sampleImg}
            fill
            className='object-cover'
          />
        </figure>
        <div className='flex flex-col justify-center gap-1'>
          <p className='text-gray-500 body-12 lg:body-16'>{category}</p>
          <p className='text-gray-800 subTitle-16 lg:subTitle-24'>{name}</p>
          <p className='text-gray-500 body-12 lg:body-16'>{address}</p>
        </div>
      </div>
      <BookmarkButton placeId={id} isMarked={true} />
    </div>
  );
};
