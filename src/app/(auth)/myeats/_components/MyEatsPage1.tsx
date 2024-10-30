'use client';
import { Tab } from '@/components/atoms/button/Tab';
import { useTabHandler } from '@/hooks/useTabHandler';
import React from 'react';
import { LikedPosts } from './like/LikedPosts';
import { BookmarkedPlaces } from './bookmark/BookmarkedPlaces';
export const MyEatsPage1 = () => {
  const tabLabels = ['내가 좋아요한 게시물', '내가 스크랩한 맛집'];
  const { activeIndex, handleTabClick } = useTabHandler();
  const contents = () => {
    if (activeIndex === 0) {
      return <LikedPosts />;
    } else if (activeIndex === 1) {
      // return <BookmarkedPlaces />;
    }
  };
  return (
    <div className='flex w-full flex-col'>
      <div className='mb-[60px] flex'>
        {/*링크로 한다면
        어찌됐든 useState  */}
        {tabLabels.map((label, i) => {
          console.log(activeIndex);
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
