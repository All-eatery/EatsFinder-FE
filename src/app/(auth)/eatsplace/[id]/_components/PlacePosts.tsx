import { FeedCard } from '@/components/molecules';
import React from 'react';

export const PlacePosts = () => {
  return (
    <div className='flex gap-2'>
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  );
};
