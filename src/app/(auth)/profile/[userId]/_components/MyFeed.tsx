import { MyFeedCard } from '@/components/molecules/myFeedCard';
import React from 'react';
import { feedDummyData } from './test/dummy';

export const MyFeed = () => {
  const arr = feedDummyData;
  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6'>
      {arr.map((feed, i) => (
        <MyFeedCard data={feed} key={i} />
      ))}
    </div>
  );
};
