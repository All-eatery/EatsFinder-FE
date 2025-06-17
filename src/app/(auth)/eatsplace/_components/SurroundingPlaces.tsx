'use client';
import { PlaceMap } from './PlaceMap';
import { PlacesCardContainer } from './PlacesCardContainer';
export const SurroundingPlaces = () => {
  return (
    <div className='flex flex-col gap-6'>
      <PlaceMap />
      <PlacesCardContainer />
    </div>
  );
};
