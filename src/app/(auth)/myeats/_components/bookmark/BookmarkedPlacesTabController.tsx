'use client';
import { BookmarkedPlacesTab } from './BookmarkedPlacesTab';
import Link from 'next/link';
import { Search } from '@/components/molecules';
import { useRouter } from 'next/navigation';
import { convertToURLSearchParams } from '@/utils/convertToURLSearchParams';
import { Checkbox } from '@/components/atoms';
import { useBookmarkContext } from '@/provider/contextProvider/BookmarkCountProvider';
import { BookmarkCountsType } from '@/types/bookmarkType';
import { useBookmarkCheckContext } from '@/provider/contextProvider/BookmarkCheckProvider';
import { useState } from 'react';
import { useSearchbarContext } from '@/provider/contextProvider/SeachBarProvider';

type BookmarkedPlacesTabControllerProps = {
  searchParams: { [key: string]: string | string[] | undefined };
  counts: BookmarkCountsType;
};
export const BookmarkedPlacesTabController = ({
  searchParams,
  counts,
}: BookmarkedPlacesTabControllerProps) => {
  const router = useRouter();
  const {
    listCount,
    setTotalItems,
    setTotalLists,
    listName,
    totalLists,
    totalItems,
  } = useBookmarkContext();
  setTotalItems(counts.totalItems);
  setTotalLists(counts.totalLists);

  /**
   * (view=all)전체보기 리스트보기 서치바
   * (view=list)전쳅보기 리스트보기 선택
   * (view=list&select=true&id=1,2,3)전체선택 취소
   * (view=list&list=리스트아이디)전쳅보기 리스트보기 하위리스트
   * (view=list&list=리스트아이디&select=true&id=1,2,3)전체선택 취소
   */

  const view = searchParams.view;
  const select = searchParams.select;
  const list = searchParams.list;
  const id = searchParams.id;
  const handleSelectToggle = () => {
    const queryParams = convertToURLSearchParams(searchParams);
    if (select) {
      queryParams.delete('select');
      if (id) queryParams.delete('id');
    } else {
      queryParams.set('select', 'true');
    }
    queryParams.set('view', 'list');
    router.push(`/myeats?${queryParams.toString()}`);
  };
  const { checkAllHandler, data } = useBookmarkCheckContext();
  const [checkboxState, setCheckboxState] = useState({
    list: false,
    place: false,
  });
  const onAllCheckClick = () => {
    checkAllHandler(!!list ? 'place' : 'list');
    setCheckboxState((prev) => ({
      ...prev,
      ...(!!list ? { place: true } : { list: true }),
    }));
  };
  const { searchbarHandler, handleSearch, resetSearchText } =
    useSearchbarContext();
  return (
    <div className='flex w-full flex-col'>
      <div className='flex h-16 justify-between'>
        {select ? (
          <button className='flex items-center gap-1' onClick={onAllCheckClick}>
            <Checkbox
              variant='Checkbox_Ver2'
              checked={!!list ? checkboxState.place : checkboxState.list}
            />
            <span className='text-gray-400 subTitle-22'>{`전체 선택 ${list ? listCount : totalLists}`}</span>
          </button>
        ) : (
          <div className='flex gap-3' onClick={resetSearchText}>
            <Link href='/myeats?tab=scrap&view=all'>
              <BookmarkedPlacesTab
                active={view === 'all'}
                display={!select === true}
              >
                {`전체보기(${totalItems})`}
              </BookmarkedPlacesTab>
            </Link>
            <div className='flex justify-center py-3 text-gray-50 subTitle-22'>
              |
            </div>
            <Link href='/myeats?tab=scrap&view=list'>
              <BookmarkedPlacesTab
                active={view === 'list' && !list}
                display={!select === true}
              >{`리스트로 보기(${totalLists})`}</BookmarkedPlacesTab>
            </Link>
            {list && (
              <>
                <div className='flex justify-center py-3 text-gray-50 subTitle-22'>
                  {'>'}
                </div>
                <BookmarkedPlacesTab
                  active={!!list}
                >{`${listName}(${listCount})`}</BookmarkedPlacesTab>
              </>
            )}
          </div>
        )}
        {view === 'list' && (
          <button
            onClick={handleSelectToggle}
            className={`flex items-center ${select ? 'text-primary-400' : 'text-gray-400'} subTitle-22`}
          >
            {select ? '취소' : '선택'}
          </button>
        )}

        {view === 'all' && (
          <div className='flex justify-end'>
            <Search
              variant='large'
              placeholder='스크랩했던 맛집을 빠르게 찾아보세요.'
              onChange={searchbarHandler}
              onSearch={handleSearch}
            />
          </div>
        )}
      </div>
    </div>
  );
};
