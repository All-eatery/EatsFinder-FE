import { useTabHandler } from '@/hooks/useTabHandler';
import React from 'react';
import { LikedPosts } from './LikedPosts';
import { BookmarkedPlaces } from './BookmarkedPlaces';
import { Tab } from '@/components/atoms/button/Tab';

export const BookmarkPlacesTab = () => {
  const tabLabels = ['전체보기', '리스트로 보기'];
  const { activeIndex, handleTabClick } = useTabHandler();
  const contents = () => {
    if (activeIndex === 0) {
      return <LikedPosts />;
    } else if (activeIndex === 1) {
      return <BookmarkedPlaces />;
    }
  };
  return (
    <div className='flex w-full flex-col'>
      <div className='flex'>
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
