'use client';
import { PlacePosts } from './PlacePosts';
import { PlaceInfo } from './PlaceInfo';
import { PlaceMap } from './PlaceMap';
import KeywordChips from '@/app/posts/[postId]/_components/postContent/KeywordChips';
import { PlaceByIdType } from '@/types/eatsPlaceType';

export const EatsPlaceDetailPage = ({ data }: { data: PlaceByIdType }) => {
  return (
    <>
      <PlaceInfo
        id={data.id}
        placeName={data.name}
        url={data.thumbnailUrl}
        popular={data.menuNames}
        lat={data.y}
        lng={data.x}
      />
      <div className='flex flex-col gap-10'>
        <PlaceMap
          isSurrounding={false}
          lat={data.y}
          lng={data.x}
          id={data.id}
        />
        {data.keywordTag && (
          <KeywordChips keywordIds={data.keywordTag} keywordsGap={5} />
        )}
      </div>
      <PlacePosts id={data.id} />
    </>
  );
};
