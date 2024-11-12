'use client';
import { Button } from '@/components/atoms';
import { PlacePosts } from './PlacePosts';
import { ToggleBtn } from '@/components/molecules/toggleBtn/ToggleBtn';
import { PlaceInfo } from './PlaceInfo';
import { PlaceMap } from './PlaceMap';
import { PlaceTag } from './PlaceTag';

export const EatsPlacePage = () => {
  return (
    <>
      <PlaceInfo />
      <div className='flex flex-col gap-10'>
        <PlaceMap />
        <PlaceTag />
        <div className='flex flex-col gap-6'>
          <div className='flex justify-end'>
            <ToggleBtn text_1='최신순' text_2='좋아요순' />
          </div>
          <PlacePosts />
        </div>
      </div>
      <div className='py-[60px]'>
        <Button variant={'stroke'}>더보기</Button>
      </div>
    </>
  );
};
