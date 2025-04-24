import { ParamsProps } from '@/types/paramsType';
import { BookmarkedPlacesTabController } from './BookmarkedPlacesTabController';
import { AllBookmarkedPlaces } from './AllBookmarkedPlaces';
import { ListInBookmarkedPlaces } from './ListInBookmarkedPlaces';
import { BookmarkedPlaceLists } from './BookmarkedPlaceLists';
import { getBookmarkCounts } from '@/api/bookmark';
import { BookmarkCheckProvider } from '@/provider/contextProvider/BookmarkCheckProvider';

export const BookmarkedPlaces = async ({ searchParams }: ParamsProps) => {
  const view = searchParams.view;
  const list = searchParams.list;
  const counts = await getBookmarkCounts();

  return (
    <BookmarkCheckProvider>
      <div className='flex flex-col gap-6'>
        <BookmarkedPlacesTabController
          searchParams={searchParams}
          counts={counts}
        />
        {list ? (
          <ListInBookmarkedPlaces />
        ) : view === 'all' ? (
          <AllBookmarkedPlaces />
        ) : (
          <BookmarkedPlaceLists />
        )}
      </div>
    </BookmarkCheckProvider>
  );
};
