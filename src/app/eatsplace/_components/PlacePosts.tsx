'use client';
import { getPlacePosts } from '@/api/place';
import { useInfiniteScrollPer3 } from '@/app/(auth)/_hooks/useInfiniteScroll';
import { Button } from '@/components/atoms';
import Loading from '@/components/atoms/loading/Loading';
import { ToggleBtn } from '@/components/molecules/toggleBtn/ToggleBtn';
import { PostsAboutPlaceType } from '@/types/eatsPlaceType';
import { FeedCard } from './FeedCard';
import { useState } from 'react';
type SortStateType = 'recent' | 'like';

export const PlacePosts = ({ id }: { id: number }) => {
  const [sortState, setSortState] = useState<SortStateType>('recent');
  const {
    data,
    status,
    isFetchingNextPage,
    handleLoadMore,
    hasNextPage,
    lastElementRef,
    isLoadMoreMode,
  } = useInfiniteScrollPer3<PostsAboutPlaceType>({
    queryKey: ['postsAboutPlace', sortState, String(id)],
    queryFn: (cursor) => getPlacePosts({ id, cursor, sort: sortState }),
    getNextPageParam: (lastPage) => lastPage.lastItemId,
  });
  if (status === 'pending') return <Loading />;
  if (status === 'error') return <div>데이터를 불러오는 중 오류 발생</div>;
  return (
    <>
      <div className='flex flex-col xl:gap-6'>
        <div className='flex justify-end'>
          <ToggleBtn
            text_1='최신순'
            label_1='recent'
            text_2='좋아요순'
            label_2='like'
            value={sortState}
            setState={setSortState}
          />
        </div>
        <div className='grid grid-cols-[repeat(auto-fill,minmax(165px,1fr))] gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4'>
          {data?.pages.map((page, pageIndex) =>
            page.items.map((item, index) => {
              const isLastItem =
                pageIndex === data.pages.length - 1 &&
                index === page.items.length - 1;
              return (
                <FeedCard
                  ref={isLastItem ? lastElementRef : null}
                  key={item.id}
                  id={item.id}
                  isLiked={item.isLiked}
                  likeCount={item.likeCount}
                  nickname={item.nickname}
                  profileImage={item.profileImage}
                  thumbnailUrl={item.thumbnailUrl}
                />
              );
            }),
          )}
        </div>
      </div>
      {isLoadMoreMode && hasNextPage && (
        <div className='mt-7 flex justify-center'>
          <Button onClick={handleLoadMore} variant={'stroke'}>
            더보기
          </Button>
        </div>
      )}
      {isFetchingNextPage && <Loading />}
    </>
  );
};
