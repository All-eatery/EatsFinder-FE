'use client';
import { Button } from '@/components/atoms';
import { Search } from '@/components/molecules';
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
      <div className='flex w-full flex-col gap-8'>
        <Search
          variant='large'
          placeholder='찾고 싶은 게시물 키워드를 검색해보세요.'
          onChange={searchbarHandler}
          onSearch={handleSearch}
        />
        {data?.pages[0].items.length ? (
          data?.pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className='grid grid-cols-[repeat(auto-fit,minmax(165px,1fr))] gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4'
            >
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
          ))
        ) : (
          <div className='my-20 flex flex-col items-center justify-center text-gray-600 subTitle-20'>
            {isSearching ? (
              <p>내가 좋아요한 게시물에는 검색결과가 없어요.</p>
            ) : (
              <>
                <p>좋아요한 게시물이 없어요.</p>
                <p>마음에 드는 게시물을 저장해 보세요.</p>
              </>
            )}
          </div>
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
