'use client';
import { Search } from '@/components/molecules';
import { SurroundingPlaces } from './SurroundingPlaces';
import { RecommandPlaces } from './RecommandPlaces';

export const EatsPlacePage = () => {
  return (
    <div className='flex w-[1368px] flex-col gap-14'>
      <Search variant={'large'} />
      {/**확실한 넓이가 업어서 기준점이 서치바가됨 */}
      <SurroundingPlaces />
      <RecommandPlaces />
      <RecommandPlaces />
    </div>
  );
};
