import React from 'react';
import { CardCarousel } from './CardCarousel';
import { getNewNeighborPosts } from '@/api/explore';
const data = new Array(23).fill(0);

export const NeighborCarousel = async () => {
  const aaa = await getNewNeighborPosts();
  console.log('adfsdfdsfdsfdsfsd', aaa);
  return <CardCarousel data={data} title='이웃님의 새로운 게시물' />;
};
