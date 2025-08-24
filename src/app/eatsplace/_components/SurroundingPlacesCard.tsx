import { Rating } from '@/components/atoms/riting/Rating';
import { BookmarkSVG } from '@/components/svg/BookmarkSVG';
import Image from 'next/image';

export const SurroundingPlacesCard = ({ src }: { src: string }) => {
  return (
    <div className='flex h-24 items-center py-2 xl:h-[185px] xl:p-[10px]'>
      <div className='flex w-full gap-6 border-b-[1px] border-b-gray-50 py-2 xl:p-5 xl:pb-[25px]'>
        <figure className='relative h-20 w-20 overflow-hidden rounded-3xl xl:h-[120px] xl:w-[180px]'>
          <Image alt='게시글 이미지' src={src} fill className='object-cover' />
        </figure>
        <div className='flex flex-1 justify-between'>
          <div className='flex flex-col justify-center gap-1'>
            <p className='text-gray-500 body-12 xl:body-16'>양식</p>
            <p className='text-gray-800 subTitle-16 xl:subTitle-24'>
              서울부띠끄
            </p>
            <p className='text-gray-500 body-12 xl:body-16'>
              서울 중구 만리재로 209-1
            </p>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='flex justify-end'>
              <BookmarkSVG />
            </div>
            <Rating rating={4.9} />
          </div>
        </div>
      </div>
    </div>
  );
};
