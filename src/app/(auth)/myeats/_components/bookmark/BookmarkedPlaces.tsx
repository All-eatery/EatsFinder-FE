import { ParamsProps } from '@/types/paramsType';
import { BookmarkedPlacesTabController } from './BookmarkedPlacesTabController';
import { AllBookmarkedPlaces } from './AllBookmarkedPlaces';
import { BookmarkedPlacesList } from './BookmarkedPlacesList';
import { ListInBookmarkedPlaces } from './ListInBookmarkedPlaces';

export const BookmarkedPlaces = ({ searchParams }: ParamsProps) => {
  console.log(searchParams);
  const view = searchParams.view;
  console.log(view);
  console.log(searchParams);
  const list = searchParams.list;
  /**
   * 스크랩 탭 (전체보기 리스트보기) 거맥
   *
   * 맛집 / 리스트그룹(사진)
   */

  return (
    <div className='flex flex-col gap-6'>
      <BookmarkedPlacesTabController searchParams={searchParams} />
      {list ? (
        <ListInBookmarkedPlaces />
      ) : view === 'all' ? (
        <AllBookmarkedPlaces />
      ) : (
        <BookmarkedPlacesList />
      )}
    </div>
  );
};
