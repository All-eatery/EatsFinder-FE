'use client';
import { getAllPosts } from '@/api/explore';
import { useInfiniteScrollPer3 } from '@/app/(auth)/_hooks/useInfiniteScroll';
import { PostCard } from '@/app/(auth)/myeats/_components/like/PostCard';
import { Button } from '@/components/atoms';
import Loading from '@/components/atoms/loading/Loading';
import { PostPaginationType } from '@/types/postType';

export const RecentPosts = () => {
  const {
    data,
    status,
    isFetchingNextPage,
    handleLoadMore,
    hasNextPage,
    lastElementRef,
    isLoadMoreMode,
  } = useInfiniteScrollPer3<PostPaginationType>({
    queryKey: ['allPosts'],
    queryFn: (cursor) => getAllPosts(cursor, 5),
    getNextPageParam: (lastPage) => lastPage.lastItemId,
  });
  if (status === 'pending') return <Loading />;
  if (status === 'error') return <div>데이터를 불러오는 중 오류 발생</div>;
  console.log({ data });
  return (
    <div className='flex flex-col gap-3 lg:gap-6'>
      <h2 className='text-gray-700 subTitle-18 lg:subTitle-28'>최근 피드</h2>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4'>
        {data?.pages.map((page, pageIndex) =>
          page.items.map((item, index) => {
            const isLastItem =
              pageIndex === data.pages.length - 1 &&
              index === page.items.length - 1;
            return (
              <PostCard
                key={item.id}
                ref={isLastItem ? lastElementRef : null}
                id={item.id}
                isLiked={item.likeStatus}
                nickname={item.users.nickname}
                profileImage={item.users.profileImage}
                src={item.thumbnailUrl}
                variant={'recent'}
              />
            );
          }),
        )}
      </div>
      {isLoadMoreMode && hasNextPage && (
        <div className='mt-7 flex justify-center'>
          <Button onClick={handleLoadMore} variant={'stroke'}>
            더보기
          </Button>
        </div>
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );
};
