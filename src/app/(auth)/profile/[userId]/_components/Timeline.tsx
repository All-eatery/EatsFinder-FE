import { UserTimeline } from '@/components/atoms/userTimeline';
import React, { useState } from 'react';
import { getMyActives } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/app/(auth)/_components/Loading';
import { NoContent } from '@/components/atoms/noContent/NoContent';

export const Timeline = ({ timelineFilter }: { timelineFilter: string[] }) => {
  const [page, setPage] = useState(0);

  const filter = timelineFilter.length > 1 ? 'ALL' : timelineFilter[0];
  const { data, error } = useQuery({
    queryKey: ['timeline', filter, page],
    queryFn: ({ queryKey }) =>
      getMyActives(String(queryKey[1]), Number(queryKey[2])),
  });
  if (error) {
    return <div>내 활동을 가져오는 데 문제가 발생했습니다.</div>;
  }
  if (!data || !Array.isArray(data)) {
    return <Loading />;
  }
  return data.length > 0 ? (
    <>
      {/* {arr.map((data) => {
        const timeLine = simplifyTimeLineData(data.data[0]);
        return <UserTimeline key={timeLine.id} timeline={timeLine} />;
      })} */}
      {/* <Pagination /> */}
    </>
  ) : (
    <NoContent msg='내 활동이 없습니다.' />
  );
};
