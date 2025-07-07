'use client';
import { SurroundingPlaces } from './SurroundingPlaces';
import { SearchAddress } from './SearchAddress';
import { useState } from 'react';
import { Coordinate } from '@/types/eatsPlaceType';

export const EatsPlacePage = () => {
  const [searchResult, setSearchResult] = useState<Coordinate | null>(null);
  return (
    <div className='flex w-[1368px] flex-col gap-14'>
      <SearchAddress setSearchResult={setSearchResult} />
      <SurroundingPlaces searchResult={searchResult} />
    </div>
  );
};
