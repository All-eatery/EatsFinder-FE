import Image from 'next/image';
import React from 'react';
import { url } from '../../myeats/_components/bookmark/AllBookmarkedPlaces';
import { BookmarkSVG } from '@/components/svg/BookmarkSVG';
import { Checkbox, Chip } from '@/components/atoms';

export const PlaceInfo = () => {
  return (
    <div className='mb-6 flex w-full flex-col items-center gap-6'>
      <figure className='relative h-[250px] w-[250px] overflow-hidden rounded-full'>
        <Image src={url} alt='리스트 맛집 이미지' fill />
      </figure>
      <div className='gpa-1 flex items-center'>
        <p className='text-primary-400 subTitle-28'>#서울부띠끄</p>
        <Checkbox variant='bookmark' />
      </div>
      <div className='flex items-center gap-2'>
        <div className='flex items-center rounded-xl bg-primary-400 px-2 py-1'>
          <p className='font-pretendard text-sm leading-[135%] text-white'>
            인기
          </p>
        </div>
        <div className='flex gap-1'>
          <Chip text='양식' />
          <Chip text='고르곤 졸라 피자' />
          <Chip text='오늘의 와인' />
        </div>
      </div>
    </div>
  );
};
