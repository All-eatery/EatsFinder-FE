'use client';
import { SurroundingPlaces } from './SurroundingPlaces';
import { SearchAddress } from './SearchAddress';
import { useState } from 'react';
import { Coordinate } from '@/types/eatsPlaceType';

export const EatsPlacePage = () => {
  const [searchResult, setSearchResult] = useState<Coordinate | null>(null);
  return (
    <div className='flex max-w-[1440px] flex-col gap-3 xl:gap-14'>
      <SearchAddress setSearchResult={setSearchResult} />
      <SurroundingPlaces searchResult={searchResult} />
    </div>
  );
};
