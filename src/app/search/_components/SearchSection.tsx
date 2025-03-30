import { Button } from '@/components/atoms';
import { DissatisfiedSVG } from '@/components/svg/DissatisfiedSVG';
import { useState } from 'react';

type SearchSectionProps<T> = {
  title: string;
  keyword: string;
  items: T[];
  filter: string;
  renderItem: (item: T) => React.ReactNode;
};

const SearchSection = <T,>({
  title,
  keyword,
  items,
  filter,
  renderItem,
}: SearchSectionProps<T>) => {
  const scrollCount = useState(0);
  const visibleCount = useState(6);
  const visibleItems = items;

  return (
    <div>
      {items.length <= 0 ? (
        <div className='flex flex-col items-center justify-center gap-6'>
          <DissatisfiedSVG />
          <div className='flex flex-col items-center text-gray-700 subTitle-20'>
            <span>{`"${keyword}"`}에 일치하는 정보를 찾을 수 없어요.</span>
            <span>이런 키워드로 검색해보시는 건 어떠세요?</span>
          </div>
        </div>
      ) : (
        <>
          <h3 className='text-gray-700 subTitle-28'>
            <span className='text-primary-400'>{`#${keyword}`}</span>
            {title}
          </h3>
          <div className='mt-6 grid grid-cols-4 gap-6'>
            {visibleItems.map((item) => renderItem(item))}
          </div>
          <div className='mt-20 flex justify-center'>
            <Button variant='stroke'>더보기</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchSection;
