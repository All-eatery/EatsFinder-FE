'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from '@/components/molecules';
import { customTwMerge } from '@/utils/customTwMerge';
import TagInSearch from './TagInSearch';

const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [serachHistory, setSearchHistory] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('searchHistory')) {
      setSearchHistory(JSON.parse(localStorage.getItem('searchHistory')!));
    }
  }, []);

  const recentSearchHistory = useMemo(() => {
    return serachHistory.slice(0, 10);
  }, [serachHistory]);

  const searchKeyword = (keyword: string) => {
    if (keyword) {
      const newHistory = [keyword, ...serachHistory];
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      router.push(`/search?keyword=${keyword}`);
    }
  };

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
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              searchKeyword(keyword);
            }
          }}
          onSearch={() => {
            searchKeyword(keyword);
          }}
        />
        {isVisible && (
          <div
            className='flex w-full flex-col gap-20 bg-white p-5'
            tabIndex={0}
          >
            <div>
              <div className='subTitle-20'>최근 검색어</div>
              <div className='flex w-full flex-wrap gap-5'>
                {recentSearchHistory.map((history) => (
                  <TagInSearch key={history}>{history}</TagInSearch>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
