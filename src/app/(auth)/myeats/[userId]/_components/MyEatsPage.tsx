'use client';
import { Tab } from '@/components/atoms/button/Tab';
import { useTabHandler } from '@/hooks/useTabHandler';
import React from 'react';
import { LikePosts } from './LikePosts';
import { ScrapPlaces } from './ScrapPlaces';
export const MyEatsPage = () => {
  const tabLabels = ['내가 좋아요한 게시물', '내가 스크랩한 맛집'];
  const { activeIndex, handleTabClick } = useTabHandler();
  const contents = () => {
    if (activeIndex === 0) {
      return <LikePosts />;
    } else if (activeIndex === 1) {
      return <ScrapPlaces />;
    }
  };
  return (
    <div className='flex w-full flex-col'>
      <div className='mb-[60px] flex'>
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
