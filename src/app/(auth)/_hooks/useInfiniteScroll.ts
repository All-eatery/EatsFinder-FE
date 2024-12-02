import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps<T> {
  queryKey: string[];
  queryFn: (page: number) => Promise<T>;
  getNextPageParam: (lastPage: T) => number | undefined;
  initialPageParam?: number;
}

export const useInfiniteScroll = <T>({
  queryKey,
  queryFn,
  getNextPageParam,
  initialPageParam = 1,
}: UseInfiniteScrollProps<T>) => {
  const [isLoadMoreMode, setIsLoadMoreMode] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<T>({
      queryKey,
      queryFn: ({ pageParam = initialPageParam }) =>
        queryFn(pageParam as number),
      initialPageParam,
      getNextPageParam,
    });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
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

  return {
    data,
    status,
    isFetchingNextPage,
    handleLoadMore,
    hasNextPage,
    lastElementRef,
    isLoadMoreMode,
  };
};
