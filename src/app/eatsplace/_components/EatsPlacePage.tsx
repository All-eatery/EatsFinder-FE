'use client';
import { Search } from '@/components/molecules';
import { SurroundingPlaces } from './SurroundingPlaces';
import { RecommandPlaces } from './RecommandPlaces';

export const EatsPlacePage = () => {
  return (
    <div className='flex w-[1368px] flex-col gap-14'>
      <Search variant={'large'} />
      <SurroundingPlaces />
      <RecommandPlaces />
      <RecommandPlaces />
    </div>
  );
};
