'use client';
import { Button } from '@/components/atoms';
import { PlacePosts } from './PlacePosts';
import { ToggleBtn } from '@/components/molecules/toggleBtn/ToggleBtn';
import { PlaceInfo } from './PlaceInfo';
import { PlaceMap } from './PlaceMap';
import KeywordChips from '@/app/posts/[postId]/_components/postContent/KeywordChips';
import { PlaceInfoProps } from '@/types/eatsPlaceType';
const tag = 'FR01,FR02,FR03';

export const EatsPlaceDetailPage = ({ data }: { data: PlaceInfoProps }) => {
  return (
    <>
      <PlaceInfo
        id={data.id}
        placeName={data.placeName}
        url={data.url}
        popular={data.popular}
      />
      <div className='flex flex-col gap-10'>
        <PlaceMap isSurrounding={false} />
        <KeywordChips keywordIds={tag} keywordsGap={5} />
        <div className='flex flex-col gap-6'>
          <div className='flex justify-end'>
            <ToggleBtn text_1='최신순' text_2='좋아요순' />
          </div>
          <PlacePosts />
        </div>
      </div>
      <div className='py-[60px]'>
        <Button variant={'stroke'}>더보기</Button>
      </div>
    </>
  );
};
