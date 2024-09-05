import Place from './Place';
import { Search } from '@/components/molecules';
import { KakaoPlaceType, PlaceType } from '@/types/postType';
import { customTwMerge } from '@/utils/customTwMerge';
import { ChangeEvent, ComponentProps, forwardRef } from 'react';

interface PostPlaceSearchProps extends ComponentProps<'div'> {
  placeName: string;
  className?: string;
  places: PlaceType[];
  kakaoPlaces: KakaoPlaceType[];
  onSearch: () => void;
  onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onPlaceClick: (placeName: string, placeId: number) => void;
  onKakaoPlaceClick: (index: number) => void;
}

export const PostPlaceSearch = forwardRef<HTMLDivElement, PostPlaceSearchProps>(
  function PostPlaceSearch(
    {
      className,
      placeName,
      places,
      kakaoPlaces,
      onSearch,
      onSearchChange,
      onPlaceClick,
      onKakaoPlaceClick,
      ...props
    },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={customTwMerge(
          'absolute z-50 mt-3 h-[540px] w-full overflow-auto rounded-3xl bg-white py-6 shadow-[0_0_20px_rgba(0,0,0,0.1)] outline-none',
          className,
        )}
        {...props}
      >
        <div className='px-5'>
          <Search
            value={placeName}
            onSearch={onSearch}
            onChange={onSearchChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSearch();
              }
            }}
          />
        </div>
        {places.map((place) => (
          <Place
            key={place.id}
            imgSrc={place.thumbnailUrl}
            name={place.name}
            address={place.roadAddress}
            isRegistered={true}
            onClick={() => {
              onPlaceClick(place.name, place.id);
            }}
          />
        ))}
        {kakaoPlaces.map((kakaoPlace, index) => (
          <Place
            key={kakaoPlace.id}
            name={kakaoPlace.place_name}
            address={kakaoPlace.road_address_name}
            onClick={() => {
              onKakaoPlaceClick(index);
            }}
          />
        ))}
      </div>
    );
  },
);
