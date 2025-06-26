'use client';
import { useSearchbarContext } from '@/provider/contextProvider/SeachBarProvider';
import { BookmarkedPlaceCard } from './BookmarkedPlaceCard';
import { useInfiniteScrollPer3 } from '@/app/(auth)/_hooks/useInfiniteScroll';
import { AllBookmarkListsType } from '@/types/bookmarkType';
import { getAllBookmarkLists } from '@/api/bookmark';
import Loading from '@/components/atoms/loading/Loading';
import { Button } from '@/components/atoms';

export const AllBookmarkedPlaces = () => {
  const { searchText } = useSearchbarContext();
  const isSearching = !!searchText.trim();
  const {
    data,
    status,
    isFetchingNextPage,
    handleLoadMore,
    hasNextPage,
    lastElementRef,
    isLoadMoreMode,
  } = useInfiniteScrollPer3<AllBookmarkListsType>({
    queryKey: ['allBookmarks', searchText],
    queryFn: (cursor) =>
      isSearching
        ? getAllBookmarkLists(cursor, searchText)
        : getAllBookmarkLists(cursor),
    getNextPageParam: (lastPage) => lastPage.lastItemId,
  });

  if (status === 'pending') {
    return <Loading />;
  }
  if (status === 'error') {
    return <div>에러</div>;
  }

  return (
    <>
      {data?.pages[0].items.length ? (
        data?.pages.map((page, pageIndex) => {
          return (
            <div key={pageIndex} className='grid grid-cols-2 gap-6'>
              {page.items.map((item, index) => {
                const isLastItem =
                  pageIndex === data.pages.length - 1 &&
                  index === page.items.length - 1;
                return (
                  <div key={item.id} ref={isLastItem ? lastElementRef : null}>
                    <BookmarkedPlaceCard
                      src={item.thumbnailUrl}
                      address={item.roadAddress}
                      category={item.depth2}
                      id={item.id}
                      name={item.name}
                    />
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div className='my-20 flex flex-col items-center justify-center text-gray-600 subTitle-20'>
          {isSearching ? (
            <>
              <p>저장한 맛집이 없어요.</p>
              <p>내가 좋아하는 맛집을 저장해 보세요.</p>
            </>
          ) : (
            <p>내가 스크랩한 맛집에는 검색결과가 없어요.</p>
          )}
        </div>
      )}
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
