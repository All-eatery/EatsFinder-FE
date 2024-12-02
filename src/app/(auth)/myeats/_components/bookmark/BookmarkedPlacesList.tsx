'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookmarkedListCard } from './BookmarkedListCard';
import { getBookmarkList } from '@/api/bookmark';
import { BookmarkedLisdtsType } from '@/types/bookmarkType';
import { Button } from '@/components/atoms';
import { useInfiniteScroll } from '@/app/(auth)/_hooks/useInfiniteScroll';

export const BookmarkedPlacesList = () => {
  const params = useSearchParams();
  const select = params.get('select');
  const router = useRouter();
  const {
    data,
    status,
    isFetchingNextPage,
    handleLoadMore,
    hasNextPage,
    lastElementRef,
    isLoadMoreMode,
  } = useInfiniteScroll<BookmarkedLisdtsType>({
    queryKey: ['myBookmarks'],
    queryFn: (page) => getBookmarkList(page),
    getNextPageParam: (lastPage) => lastPage.lastItemId,
  });
  const handleCardClick = (id: number) => {
    router.push(`?list=${id}`);
  };
  if (status === 'pending') return <div>로딩 중...</div>;
  if (status === 'error') return <div>데이터를 불러오는 중 오류 발생</div>;

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex} className='flex flex-col gap-4'>
          {page.items.map((item, index) => {
            const isLastItem =
              pageIndex === data.pages.length - 1 &&
              index === page.items.length - 1;

            return (
              <div
                key={item.id}
                ref={isLastItem ? lastElementRef : null}
                onClick={() => handleCardClick(item.id)}
              >
                <BookmarkedListCard
                  id={item.id}
                  isSelect={select}
                  title={item.title}
                  count={item.count}
                  thumbnails={item.bookmarkPlaces}
                />
              </div>
            );
          })}
        </div>
      ))}

      {isLoadMoreMode && hasNextPage && (
        <div className='mt-7 flex justify-center'>
          <Button onClick={handleLoadMore} variant={'stroke'}>
            더보기
          </Button>
        </div>
      )}

      {isFetchingNextPage && <div>로딩 중...</div>}

      {!hasNextPage && (
        <div className='py-4 text-center'>더 이상 북마크가 없습니다.</div>
      )}
    </div>
  );
};
