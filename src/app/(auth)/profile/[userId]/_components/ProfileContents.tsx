'use client';
import { Tab } from '@/components/atoms/button/Tab';
import { useTabHandler } from '@/hooks/useTabHandler';
import React from 'react';
import { MyFeed } from './MyFeed';
import { Timeline } from './Timeline';
import { ProfilePageProps } from '@/types/authType';
import { ToggleBtn } from '@/components/molecules/toggleBtn/ToggleBtn';
import { Pagination } from './Pagination';

export const ProfileContents = ({
  isOwnProfile,
  userData,
}: ProfilePageProps) => {
  const tabLabels = isOwnProfile ? ['내 피드', '내 활동'] : ['게시글'];
  const { activeIndex, handleTabClick } = useTabHandler();
  const contents = () => {
    if (isOwnProfile) {
      if (activeIndex === 0) {
        return <MyFeed userId={userData.id} />;
      } else if (activeIndex === 1) {
        return <Timeline />;
      }
    } else {
      return <MyFeed userId={userData.id} />;
    }
  };

  return (
    <div className='flex w-[1368px] flex-col gap-6'>
      <div className='flex w-full items-center justify-between'>
        <div className='flex'>
          {isOwnProfile ? (
            tabLabels.map((label, i) => {
              return (
                <>
                  <Tab
                    key={i}
                    active={activeIndex === i}
                    onClick={() => handleTabClick(i)}
                  >
                    {label}
                  </Tab>
                </>
              );
            })
          ) : (
            <div className='border-b-4 border-gray-800 text-gray-800 title-28'>
              게시글
            </div>
          )}
        </div>

        {activeIndex === 1 && isOwnProfile && (
          <ToggleBtn text_1='댓글만' text_2='좋아요만' />
        )}
      </div>
      {contents()}
    </div>
  );
};
