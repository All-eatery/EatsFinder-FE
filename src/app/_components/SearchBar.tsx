'use client';
import { useState, useRef } from 'react';
import { Search } from '@/components/molecules';
import { customTwMerge } from '@/utils/customTwMerge';
import TagInSearch from './TagInSearch';

const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className='relative z-10 flex justify-center'>
      <div
        className={customTwMerge(
          'absolute w-[770px] overflow-hidden rounded-[30px]',
          isVisible && 'shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
        )}
        ref={containerRef}
        onFocus={() => setIsVisible(true)}
        onBlur={(e) => {
          if (
            containerRef.current &&
            !containerRef.current.contains(e.relatedTarget)
          ) {
            setIsVisible(false);
          }
        }}
      >
        <Search
          variant='large'
          placeholder='오늘 어떤 음식을 드실 에정인가요?'
        />
        {isVisible && (
          <div
            className='flex w-full flex-col gap-20 bg-white p-5'
            tabIndex={0}
          >
            <div>
              <div className='subTitle-20'>최근 검색어</div>
              <div className='flex w-full flex-wrap gap-5'>
                <TagInSearch>동해물과백두산이마르고닳도록</TagInSearch>
                <TagInSearch>동해물과백두산이마르고닳도록</TagInSearch>
                <TagInSearch>동해물과백두산이마르고닳도록</TagInSearch>
                <TagInSearch>동해물과백두산이마르고닳도록</TagInSearch>
                <TagInSearch>동해물과백두산이마르고닳도록</TagInSearch>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
