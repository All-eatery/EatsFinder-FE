import { Tab } from '@/components/atoms/button/Tab';
import Link from 'next/link';
import React from 'react';
import { LikedPosts } from './like/LikedPosts';
import { BookmarkedPlaces } from './bookmark/BookmarkedPlaces';
import { ParamsProps } from '@/types/paramsType';
export const MyEatsPage = ({ searchParams }: ParamsProps) => {
  const tab = searchParams!.tab as string;
  const view = searchParams!.view as string;
  console.log(view);
  return (
    <div className='flex w-full flex-col'>
      <div className='mb-[60px] flex'>
        <Link href={'/myeats?tab=like'}>
          <Tab active={tab === 'like'}>내가 좋아요한 게시물</Tab>
        </Link>
        <Link href={'/myeats?tab=scrap&view=all'}>
          <Tab active={tab === 'scrap'}>내가 스크랩한 맛집</Tab>
        </Link>
      </div>
      {tab === 'like' ? (
        <LikedPosts />
      ) : (
        <BookmarkedPlaces searchParams={searchParams} />
      )}
    </div>
  );
};
