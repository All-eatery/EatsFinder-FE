'use client';
import { useSearchParams } from 'next/navigation';
import { BookmarkedPlaceCard } from './BookmarkedPlaceCard';
import { sampleImg } from '@/app/(auth)/profile/[userId]/_components/FollowList';
import { Button } from '@/components/atoms';

export const ListInBookmarkedPlaces = () => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');
  const url = sampleImg;
  console.log('select', select);
  return (
    <div>
      <div
        className={`${select && 'max-h-[calc(100vh-120px)] overflow-y-auto'} flex flex-col gap-9`}
      >
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
      </div>
      {select && (
        <div className='my-[60px] flex justify-center gap-3'>
          <Button variant={'stroke'} size={'small'}>
            이동
          </Button>
          <Button variant={'stroke'} size={'small'}>
            삭제
          </Button>
        </div>
      )}
    </div>
  );
};
