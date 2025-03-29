import { UserTimeline } from '@/components/atoms/userTimeline';
import { getMyActives } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '@/app/(auth)/_components/Loading';
import { NoContent } from '@/components/atoms/noContent/NoContent';
import { Pagination } from '@/components/molecules/pagination';
import { simplifyTimeLineData } from '@/utils/simplifyTimeLineData';
interface TimelineProps {
  timelineFilter: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const Timeline = ({ timelineFilter, page, setPage }: TimelineProps) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['timeline', timelineFilter, page],
    queryFn: ({ queryKey }) =>
      getMyActives(String(queryKey[1]), Number(queryKey[2])),
  });
  if (error) {
    return <div>내 활동을 가져오는 데 문제가 발생했습니다.</div>;
  }
  if (!data || !Array.isArray(data.data)) {
    return <Loading />;
  }
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
