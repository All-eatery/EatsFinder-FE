import { Tab } from '@/components/atoms/button/Tab';
import Link from 'next/link';
import { LikedPosts } from './like/LikedPosts';
import { BookmarkedPlaces } from './bookmark/BookmarkedPlaces';
import { ParamsProps } from '@/types/paramsType';
export const MyEatsPage = ({ searchParams }: ParamsProps) => {
  const tab = searchParams!.tab as string;
  return (
    <div className='flex w-full flex-col'>
      <div className='mb-5 flex w-full lg:mb-[60px] lg:flex lg:gap-6'>
        <Link className='w-full lg:w-auto' href={'/myeats?tab=like'}>
          <Tab active={tab === 'like'}>내가 좋아요한 게시물</Tab>
        </Link>
        <Link className='w-full lg:w-auto' href={'/myeats?tab=scrap&view=all'}>
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
