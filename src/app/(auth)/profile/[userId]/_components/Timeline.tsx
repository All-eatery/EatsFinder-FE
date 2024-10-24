import { UserTimeline } from '@/components/atoms/userTimeline';
import React from 'react';
import { activeDummyData } from './test/dummy';
import { simplifyTimeLineData } from '@/utils/simplifyTimeLineData';
import { getMyActives } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/app/(auth)/_components/Loading';
import { NoContent } from '@/components/atoms/noContent/NoContent';
import { Pagination } from '@/components/molecules/pagination';

export const Timeline = () => {
  const arr = activeDummyData;
  const { data, error } = useQuery({
    queryKey: ['timeline'],
    queryFn: () => getMyActives(),
  });
  if (error) {
    return <div>내 활동을 가져오는 데 문제가 발생했습니다.</div>;
  }
  if (!data || !Array.isArray(data)) {
    return <Loading />;
  }
  return data.length > 0 ? (
    <>
      {arr.map((data) => {
        const timeLine = simplifyTimeLineData(data.data[0]);
        return <UserTimeline key={timeLine.id} timeline={timeLine} />;
      })}
      {/* <Pagination /> */}
    </>
  ) : (
    <NoContent msg='내 활동이 없습니다.' />
  );
};
