import { UserTimeline } from '@/components/atoms/userTimeline';
import React from 'react';
import { activeDummyData } from './test/dummy';
import { simplifyTimeLineData } from '@/utils/simplifyTimeLineData';

export const Timeline = () => {
  const arr = activeDummyData;

  return (
    <>
      {arr.map((data) => {
        const timeLine = simplifyTimeLineData(data.data[0]);
        return <UserTimeline key={timeLine.id} timeline={timeLine} />;
      })}
    </>
  );
};
