'use client';
import { useRouter } from 'next/navigation';
import { BookmarkedListCard } from './BookmarkedListCard';

export const BookmarkedPlacesList = () => {
  const router = useRouter();

  return (
    <>
      <BookmarkedListCard />
      <BookmarkedListCard />
      <BookmarkedListCard />
    </>
  );
};
