import { sampleImg } from '@/app/(auth)/profile/[userId]/_components/FollowList';
import { Checkbox } from '@/components/atoms';
import { CheckBoXSVG_Ver2 } from '@/components/svg/CheckBoxSVG';
import Image from 'next/image';
import React from 'react';
interface BookmarkedPlaceCard {
  id: number;
  src: string;
  category: string;
  name: string;
  address: string;
  select?: boolean;
  isSeleceted?: boolean;
}
export const BookmarkedPlaceCard = ({
  src,
  address,
  category,
  name,
  select,
  isSeleceted,
}: BookmarkedPlaceCard) => {
  return (
    <div className='relative flex h-[185px] items-center p-[10px]'>
      {select && (
        <div className='absolute left-6 top-6'>
          <Checkbox variant='Checkbox_Ver2' checked={isSeleceted} />
        </div>
      )}
      <div className='flex w-full gap-6 border-b-[1px] border-b-gray-50 p-5 pb-[25px]'>
        <figure className='relative h-[120px] w-[180px] overflow-hidden rounded-3xl'>
          <Image
            alt='게시글 이미지'
            src={src || sampleImg}
            fill
            className='object-cover'
          />
        </figure>
        <div className='flex flex-col justify-center gap-1'>
          <p className='text-gray-500 body-16'>{category}</p>
          <p className='text-gray-800 subTitle-24'>{name}</p>
          <p className='text-gray-500 body-16'>{address}</p>
        </div>
      </div>
    </div>
  );
};
