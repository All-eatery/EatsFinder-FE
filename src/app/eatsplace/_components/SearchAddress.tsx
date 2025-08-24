'use client';

import { useState, KeyboardEvent, Dispatch, SetStateAction } from 'react';
import { SearchSVG } from '@/components/svg/SearchSVG';
import { UploadSVG } from '@/components/svg/UploadSVG';
import { useToast } from '@/provider/contextProvider/ToastProvider';
import { Coordinate } from '@/types/eatsPlaceType';
interface SearchAddressProps {
  setSearchResult: Dispatch<SetStateAction<Coordinate | null>>;
}

export const SearchAddress = ({ setSearchResult }: SearchAddressProps) => {
  const [keyword, setKeyword] = useState('');
  const { showToast } = useToast();
  const handleSearch = () => {
    if (!keyword.trim()) {
      showToast('검색어를 입력해주세요.', 'error');
      return;
    }

    if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
      showToast(
        '카카오맵 서비스가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.',
        'error',
      );
      return;
    }

    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data: any[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const firstPlace = data[0];
        const resultCoords = {
          lat: Number(firstPlace.y),
          lng: Number(firstPlace.x),
        };

        setSearchResult(resultCoords);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        showToast('검색 결과가 없습니다.', 'error');
        setSearchResult(null);
      } else {
        showToast('검색 중 오류가 발생했습니다.', 'error');
        setSearchResult(null);
      }
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='relative mx-auto flex h-12 w-full max-w-[770px] items-center gap-2 rounded-[30px] border border-gray-100 p-5 body-18 focus-within:border-2 focus-within:border-primary-400 xl:h-[60px]'>
        <div className='pointer-events-none absolute hidden xl:block'>
          <SearchSVG />
        </div>
        <input
          className='w-full outline-none xl:pl-8'
          placeholder='지역명, 건물명 등을 입력하세요 '
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button aria-label='search button' type='button' onClick={handleSearch}>
          <UploadSVG className='hidden xl:block' />
          <SearchSVG className='block xl:hidden' />{' '}
        </button>
      </div>
    </div>
  );
};
