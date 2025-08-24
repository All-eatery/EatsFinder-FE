'use client';
import { useState } from 'react';
import { SurroundingPlacesCard } from './SurroundingPlacesCard';
import { sampleImg } from '@/app/(auth)/profile/[userId]/_components/FollowList';
import { Pagination } from '@/components/molecules/pagination';

const sampleData = {
  totalItems: 10,
  itemsPerPage: 8,
  totalPage: 10,
  currentPage: 9,
  isLastPage: false,
};
export const PlacesCardContainer = () => {
  const [page, setPage] = useState(0);

  return (
    <>
      <div className='grid grid-cols-1 xl:grid-cols-2'>
        <SurroundingPlacesCard src={sampleImg} />
        <SurroundingPlacesCard src={sampleImg} />
        <SurroundingPlacesCard src={sampleImg} />
        <SurroundingPlacesCard src={sampleImg} />
        <SurroundingPlacesCard src={sampleImg} />
        <SurroundingPlacesCard src={sampleImg} />
      </div>
      <Pagination
        currentPage={page}
        setPage={setPage}
        pagination={sampleData}
      />
    </>
  );
};
