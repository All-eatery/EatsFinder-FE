'use client';
import { Button } from '@/components/atoms';
import { Search } from '@/components/molecules';
import React from 'react';
import { PostCard } from './PostCard';
import { getLikedPosts } from '@/api/socialActions';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/components/atoms/loading/Loading';
import { LikedPostsType } from '@/types/authType';
import { useSearchbarHandler } from '@/hooks/useSearchbarHandler';

export const LikedPosts = () => {
  const { data, isLoading, isError } = useQuery<LikedPostsType>({
    queryKey: ['likedPosts'],
    queryFn: () => getLikedPosts(),
  });
  console.log(data);
  const { searchText, searchbarHandler, handleSearch } = useSearchbarHandler();
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <div>에러</div>;
  }
  //onSeacrh에 api연결해서 검색하는 로직 추가하기

  return (
    <div className='flex flex-col items-center gap-20'>
      <div className='flex flex-col items-center gap-8'>
        <Search
          variant='large'
          placeholder='찾고 싶은 게시물 키워드를 검색해보세요.'
          onChange={searchbarHandler}
          onSearch={handleSearch}
        />
        <div className='grid grid-cols-5 gap-4'>
          {data?.posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.postId}
              nickname={post.postUserNickname}
              src={post.postThumbnailUrl}
              profileImage={post.postUserProfileImage}
              isLiked={post.isPostLike}
            />
          ))}
        </div>
      </div>
      <Button variant={'stroke'}>더보기</Button>
    </div>
  );
};
