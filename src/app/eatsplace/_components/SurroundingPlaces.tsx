'use client';
import { Coordinate } from '@/types/eatsPlaceType';
import { PlaceMap } from './PlaceMap';
import { PlacesCardContainer } from './PlacesCardContainer';
interface SurroundingPlacesProps {
  searchResult: Coordinate | null;
}

export const SurroundingPlaces = ({ searchResult }: SurroundingPlacesProps) => {
  return (
    <div className='flex w-full flex-col gap-6'>
      <PlaceMap lat={searchResult?.lat} lng={searchResult?.lng} />
      <PlacesCardContainer />
    </div>
  );
};
