'use client';
import { Search } from '@/components/molecules';
import { SurroundingPlaces } from './SurroundingPlaces';

export const EatsPlacePage = () => {
  return (
    <div className='flex w-[1368px] flex-col gap-14'>
      <Search variant={'large'} />
      <SurroundingPlaces />
    </div>
  );
};
