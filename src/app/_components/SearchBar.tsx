'use client';
import { useState } from 'react';
import { Search } from '@/components/molecules';
import { customTwMerge } from '@/utils/customTwMerge';

const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className='relative z-10 flex justify-center'>
      <div
        className={customTwMerge(
          'absolute overflow-hidden rounded-[30px]',
          isVisible && 'shadow-[0_4px_20px_rgba(0,0,0,0.1)]',
        )}
      >
        <Search
          variant='large'
          placeholder='오늘 어떤 음식을 드실 에정인가요?'
        />
        {isVisible && (
          <div className='flex w-full flex-col gap-20 bg-white p-5'>
            <div></div>
            <div>
              <div>실시간 급상승</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
