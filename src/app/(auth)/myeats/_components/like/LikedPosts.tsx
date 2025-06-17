'use client';
import { Button } from '@/components/atoms';
import { Search } from '@/components/molecules';
import React, { useState } from 'react';
import { PostCard } from './PostCard';
import { getLikedPosts, getSearchLikedPosts } from '@/api/socialActions';
import Loading from '@/components/atoms/loading/Loading';
import { LikedPostsType } from '@/types/authType';
import { useSearchbarHandler } from '@/hooks/useSearchbarHandler';
import { useInfiniteScrollPer3 } from '@/app/(auth)/_hooks/useInfiniteScroll';

export const LikedPosts = () => {
  const { searchbarHandler, searchText, handleSearch } = useSearchbarHandler();

  const isSearching = !!searchText.trim();
  const {
    data,
    status,
    isFetchingNextPage,
    handleLoadMore,
    hasNextPage,
    lastElementRef,
    isLoadMoreMode,
  } = useInfiniteScrollPer3<LikedPostsType>({
    queryKey: ['likedPosts', searchText],
    queryFn: (cursor) =>
      isSearching
        ? getSearchLikedPosts(cursor, searchText)
        : getLikedPosts(cursor),
    getNextPageParam: (lastPage) => lastPage.lastItemId,
  });

  if (status === 'pending') {
    return <Loading />;
  }
  if (status === 'error') {
    return <div>에러</div>;
  }

  return (
    <div className='flex flex-col items-center gap-20'>
      <div className='flex flex-col items-center gap-8'>
        <Search
          variant='large'
          placeholder='찾고 싶은 게시물 키워드를 검색해보세요.'
          onChange={searchbarHandler}
          onSearch={handleSearch}
        />
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex} className='grid grid-cols-5 gap-4'>
            {page.items.map((item, index) => {
              const isLastItem =
                pageIndex === data.pages.length - 1 &&
                index === page.items.length - 1;

              return (
                <div key={item.id} ref={isLastItem ? lastElementRef : null}>
                  <PostCard
                    key={item.id}
                    id={item.postId}
                    nickname={item.postUserNickname}
                    src={item.postThumbnailUrl}
                    profileImage={item.postUserProfileImage}
                    isLiked={item.isPostLike}
                  />
                </div>
              );
            })}
          </div>
        ))}
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
