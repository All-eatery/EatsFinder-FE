'use client';
import { PlaceMap } from './PlaceMap';
import { PlacesCardContainer } from './PlacesCardContainer';

export const SurroundingPlaces = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h2 className='subTitle-2 text-gray-700'>
        민정님 주변의 맛집 (대구 수성구)
      </h2>
      <PlaceMap />
      <PlacesCardContainer />
    </div>
  );
};
