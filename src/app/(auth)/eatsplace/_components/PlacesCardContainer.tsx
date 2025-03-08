import React, { useState } from 'react';
import { BookmarkedPlaceCard } from '../../myeats/_components/bookmark/BookmarkedPlaceCard';
import { sampleImg } from '../../profile/[userId]/_components/FollowList';
import { Pagination } from '@/components/molecules/pagination';
import { SurroundingPlacesCard } from './SurroundingPlacesCard';
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
      <div className='grid grid-cols-2'>
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
