import { MyFeedCard } from '@/components/molecules/myFeedCard';
import React from 'react';
import { feedDummyData } from './test/dummy';
import { useQuery } from '@tanstack/react-query';
import { getUserFeeds } from '@/api/profile';
import { FeedType } from '@/types/authType';
import { NoContent } from '@/components/atoms/noContent/NoContent';
import { Loading } from '@/app/(auth)/_components/Loading';
type UserIdProps = {
  userId: number;
};
export const MyFeed = ({ userId }: UserIdProps) => {
  const arr = feedDummyData;
  const { data, error } = useQuery({
    queryKey: ['feeds', userId],
    queryFn: ({ queryKey }) => getUserFeeds(Number(queryKey[1])),
  });
  if (error) {
    return <div>피드를 가져오는 데 문제가 발생했습니다.</div>;
  }
  if (!data || !Array.isArray(data)) {
    return <Loading />;
  }
  console.log(data);
  return data.length > 0 ? (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6'>
      {data.map((feed, i) => (
        <MyFeedCard data={feed} key={i} />
      ))}
    </div>
  ) : (
    <NoContent msg='게시글이 없습니다.' />
  );
};
