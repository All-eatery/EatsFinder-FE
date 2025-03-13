'use client';
import { PlaceMap } from './PlaceMap';
import { PlacesCardContainer } from './PlacesCardContainer';

export const SurroundingPlaces = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-gray-700 subTitle-28'>
        민정님 주변의 맛집 (대구 수성구)
      </h2>
      <PlaceMap />
      <PlacesCardContainer />
    </div>
  );
};

//TODO: 내위치 가져오기
