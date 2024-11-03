import { UserTimeline } from '@/components/atoms/userTimeline';
import React, { useState } from 'react';
import { getMyActives } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/app/(auth)/_components/Loading';
import { NoContent } from '@/components/atoms/noContent/NoContent';
import { Pagination } from '@/components/molecules/pagination';
import { simplifyTimeLineData } from '@/utils/simplifyTimeLineData';

export const Timeline = ({ timelineFilter }: { timelineFilter: string[] }) => {
  const [page, setPage] = useState(0);

  const filter = timelineFilter.length > 1 ? 'ALL' : timelineFilter[0];
  const { data, error, isLoading } = useQuery({
    queryKey: ['timeline', filter, page],
    queryFn: ({ queryKey }) =>
      getMyActives(String(queryKey[1]), Number(queryKey[2])),
  });
  if (error) {
    return <div>내 활동을 가져오는 데 문제가 발생했습니다.</div>;
  }
  if (!data || !Array.isArray(data.data)) {
    return <Loading />;
  }
  console.log('데이타 잘들어왔니?', data);
  console.log(typeof data.data);
  return data.data.length > 0 ? (
    <>
      {data.data.map((data, i) => {
        const timeLine = simplifyTimeLineData(data);
        return <UserTimeline key={i} timeline={timeLine} />;
      })}
      <Pagination
        pagination={data.pagination}
        setPage={setPage}
        currentPage={page}
      />
    </>
  ) : (
    <NoContent msg='내 활동이 없습니다.' />
  );
};
