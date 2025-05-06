import React from 'react';
import { CardCarousel } from './CardCarousel';
const data = new Array(23).fill(0);

export const NeighborCarousel = () => {
  return <CardCarousel data={data} title='이웃님의 새로운 게시물' />;
};
