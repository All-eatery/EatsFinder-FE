import { ParamsProps } from '@/types/paramsType';
import { BookmarkedPlacesTabController } from './BookmarkedPlacesTabController';
import { AllBookmarkedPlaces } from './AllBookmarkedPlaces';
import { BookmarkedPlacesList } from './BookmarkedPlacesList';
import { ListInBookmarkedPlaces } from './ListInBookmarkedPlaces';

export const BookmarkedPlaces = ({ searchParams }: ParamsProps) => {
  const view = searchParams.view;
  const list = searchParams.list;

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
