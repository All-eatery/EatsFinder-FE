import { MyFeedCard } from '@/components/molecules/myFeedCard';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserFeeds } from '@/api/profile';
import { NoContent } from '@/components/atoms/noContent/NoContent';
import { Loading } from '@/app/(auth)/_components/Loading';
import { Pagination } from '@/components/molecules/pagination';
type UserIdProps = {
  userId: number;
};
export const MyFeed = ({ userId }: UserIdProps) => {
  const [page, setPage] = useState(0);

  const { data, error } = useQuery({
    queryKey: ['feeds', userId, page],
    queryFn: ({ queryKey }) =>
      getUserFeeds({ id: Number(queryKey[1]), page: Number(queryKey[2]) }),
  });
  if (error) {
    return <div>피드를 가져오는 데 문제가 발생했습니다.</div>;
  }
  if (!data?.data || !Array.isArray(data.data)) {
    return <Loading />;
  }
  console.log('data', data);
  console.log(data.pagination);
  return data.data.length > 0 ? (
    <>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6'>
        {data.data.map((feed, i) => (
          <MyFeedCard data={feed} key={i} />
        ))}
      </div>
      <Pagination
        pagination={data.pagination}
        setPage={setPage}
        currentPage={page}
      />
    </>
  ) : (
    <NoContent msg='게시글이 없습니다.' />
  );
};
