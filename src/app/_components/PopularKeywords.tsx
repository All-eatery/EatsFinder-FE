'use client';
import { HomeSection } from '@/components/molecules';
import { Hashtag } from '@/components/atoms';
import { useGetPopularKeywords } from '../_hooks/useGetPopularKeywords';

const PopularKeywords = () => {
  const { data: popluarKeywords } = useGetPopularKeywords();

  return (
    <HomeSection title='인기 급상승 키워드'>
      <div className='flex gap-6'>
        {popluarKeywords?.map((keyword, idx) => {
          return <Hashtag key={idx} hashtag={keyword} />;
        })}
      </div>
      <p className='flex justify-center text-gray-400 body-16'>
        현재 인기 검색어가 없습니다.
      </p>
    </HomeSection>
  );
};

export default PopularKeywords;
