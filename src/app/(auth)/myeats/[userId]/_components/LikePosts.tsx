import { Button } from '@/components/atoms';
import { Search } from '@/components/molecules';
import React from 'react';

export const LikePosts = () => {
  return (
    <div className='flex flex-col items-center gap-20'>
      <div className='flex flex-col items-center gap-8'>
        <Search
          variant='large'
          placeholder='찾고 싶은 게시물 키워드를 검색해보세요.'
        />
        카드
      </div>

      <Button variant={'stroke'}>더보기</Button>
    </div>
  );
};
