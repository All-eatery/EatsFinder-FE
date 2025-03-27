import Image from 'next/image';
import React from 'react';
import { Checkbox, Chip } from '@/components/atoms';
import { PlaceInfoProps } from '@/types/eatsPlaceType';

export const PlaceInfo = ({
  popular,
  url,
  placeName: name,
}: PlaceInfoProps) => {
  return (
    <div className='mb-6 flex w-full flex-col items-center gap-6'>
      <figure className='relative h-[250px] w-[250px] overflow-hidden rounded-full'>
        <Image src={url} alt='리스트 맛집 이미지' fill />
      </figure>
      <div className='gpa-1 flex items-center'>
        <p className='text-primary-400 subTitle-28'>#{name}</p>
        <Checkbox variant='bookmark' />
      </div>
      <div className='flex items-center gap-2'>
        <div className='flex items-center rounded-xl bg-primary-400 px-2 py-1'>
          <p className='font-pretendard text-sm leading-[135%] text-white'>
            인기
          </p>
        </div>
        <div className='flex gap-1'>
          {popular.map((menu, idx) => (
            <Chip text={menu} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};
