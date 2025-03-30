import React from 'react';
import { CardCarousel } from './CardCarousel';
const data = new Array(23).fill(0);

export const RealTimeTrendingPosts = () => {
  return (
    <div>
      <h2 className='my-3 text-gray-700 subTitle-28'>실시간 인기 게시물</h2>
      <CardCarousel data={data} />
    </div>
  );
};
