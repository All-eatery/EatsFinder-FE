'use client';
import { useSearchParams } from 'next/navigation';
import { BookmarkedListCard } from './BookmarkedListCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBookmarkList } from '@/api/bookmark';
import { useCallback, useRef, useState } from 'react';
import Loading from '@/components/atoms/loading/Loading';
import { BookmarkedLisdtsType } from '@/types/bookmarkType';
import { Button } from '@/components/atoms';

export const BookmarkedPlacesList = () => {
  const params = useSearchParams();
  const select = params.get('select');

  const [isLoadMoreMode, setIsLoadMoreMode] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<BookmarkedLisdtsType>({
      queryKey: ['myBookmarks'],
      queryFn: ({ pageParam = 1 }) => getBookmarkList(pageParam as number),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.lastItemId || undefined;
      },
    });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastBookmarkElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            !isLoadMoreMode &&
            entries[0].isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage
          ) {
            if (scrollCount >= 2) {
              setIsLoadMoreMode(true);
            } else {
              setScrollCount((prev) => prev + 1);
              fetchNextPage();
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px',
        },
      );

      if (node) observerRef.current.observe(node);
    },
    [
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      scrollCount,
      isLoadMoreMode,
    ],
  );

  const handleLoadMore = () => {
    setScrollCount(0);
    setIsLoadMoreMode(false);
    fetchNextPage();
  };

  if (status === 'pending') return <Loading />;
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
                ref={isLastItem ? lastBookmarkElementRef : null}
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

      {isFetchingNextPage && <Loading />}

      {!hasNextPage && (
        <div className='py-4 text-center'>더 이상 북마크가 없습니다.</div>
      )}
    </div>
  );
};
