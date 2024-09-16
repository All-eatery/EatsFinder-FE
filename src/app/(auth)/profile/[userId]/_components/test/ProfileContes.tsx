'use client';
import { Tab } from '@/components/atoms/button/Tab';
import { useTabHandler } from '@/hooks/useTabHandler';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '@/api/profile';
import { MyFeed } from '../MyFeed';
import { Timeline } from '../Timeline';
export const ProfileContents = ({ userId }: { userId: string }) => {
  const tabLabels = ['내 피드', '내 활동'];
  const { activeIndex, handleTabClick } = useTabHandler();
  const contents = () => {
    if (activeIndex === 0) {
      return <MyFeed />;
    } else if (activeIndex === 1) {
      return <Timeline />;
    }
  };
  const { data } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: ({ queryKey }) => getUserProfile(queryKey[1]),
  });
  console.log(data);
  return (
    <div className='flex w-[1368px] flex-col gap-6'>
      <div className='flex'>
        {tabLabels.map((label, i) => {
          return (
            <Tab
              key={i}
              active={activeIndex === i}
              onClick={() => handleTabClick(i)}
            >
              {label}
            </Tab>
          );
        })}
      </div>
      {contents()}
    </div>
  );
};
