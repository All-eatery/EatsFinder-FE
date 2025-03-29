'use client';
import { useSearchParams } from 'next/navigation';
import { BookmarkedListCard } from './BookmarkedListCard';

export const BookmarkedPlacesList = () => {
  const params = useSearchParams();
  const select = params.get('select');
  return (
    <div className='flex flex-col gap-4'>
      <BookmarkedListCard isSelect={select} />
      <BookmarkedListCard isSelect={select} />
      <BookmarkedListCard isSelect={select} />
      <BookmarkedListCard isSelect={select} />
      <BookmarkedListCard isSelect={select} />
      <BookmarkedListCard isSelect={select} />
      <BookmarkedListCard isSelect={select} />
      <BookmarkedListCard isSelect={select} />
    </div>
  );
};
