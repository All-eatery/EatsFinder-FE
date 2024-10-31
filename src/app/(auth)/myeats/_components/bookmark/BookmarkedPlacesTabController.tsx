'use client';
import { ParamsProps } from '@/types/paramsType';
import { BookmarkedPlacesTab } from './BookmarkedPlacesTab';
import Link from 'next/link';
import { Search } from '@/components/molecules';
import { CheckBoXSVG_Ver2 } from '@/components/svg/CheckBoxSVG';
import { useRouter } from 'next/navigation';
import { convertToURLSearchParams } from '@/utils/convertToURLSearchParams';

export const BookmarkedPlacesTabController = ({
  searchParams,
}: ParamsProps) => {
  const router = useRouter();

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
  const count = 1;
  const listName = '기본 리스트';
  const handleSelectToggle = () => {
    const queryParams = convertToURLSearchParams({ searchParams });
    if (select) {
      queryParams.delete('select');
      if (id) queryParams.delete('id');
    } else {
      queryParams.set('select', 'true');
    }
    queryParams.set('view', 'list');
    router.push(`/myeats?${queryParams.toString()}`);
  };
  return (
    <div className='flex w-full flex-col'>
      <div className='flex h-16 justify-between'>
        {select ? (
          <button className='flex items-center gap-1'>
            <CheckBoXSVG_Ver2 isChecked='blank' />
            <span className='text-gray-400 subTitle-22'>{`전체 선택${count}`}</span>
          </button>
        ) : (
          <div className='flex gap-3'>
            <Link href='/myeats?tab=scrap&view=all'>
              <BookmarkedPlacesTab
                active={view === 'all'}
                display={!select === true}
              >
                {`전체보기(${count})`}
              </BookmarkedPlacesTab>
            </Link>
            <div className='flex justify-center py-3 text-gray-50 subTitle-22'>
              |
            </div>
            <Link href='/myeats?tab=scrap&view=list'>
              <BookmarkedPlacesTab
                active={view === 'list' && !list}
                display={!select === true}
              >{`리스트로 보기(${count})`}</BookmarkedPlacesTab>
            </Link>
            {list && (
              <>
                <div className='flex justify-center py-3 text-gray-50 subTitle-22'>
                  {'>'}
                </div>
                <BookmarkedPlacesTab
                  active={!!list}
                >{`${listName}${count}`}</BookmarkedPlacesTab>
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
              className=''
              variant='large'
              placeholder='스크랩했던 맛집을 빠르게 찾아보세요.'
            />
          </div>
        )}
      </div>
    </div>
  );
};
