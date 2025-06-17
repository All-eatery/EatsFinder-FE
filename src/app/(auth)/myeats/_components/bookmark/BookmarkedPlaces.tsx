import { ParamsProps } from '@/types/paramsType';
import { BookmarkedPlacesTabController } from './BookmarkedPlacesTabController';
import { AllBookmarkedPlaces } from './AllBookmarkedPlaces';
import { ListInBookmarkedPlaces } from './ListInBookmarkedPlaces';
import { BookmarkedPlaceLists } from './BookmarkedPlaceLists';
import { getBookmarkCounts } from '@/api/bookmark';
import { BookmarkCombinedProvider } from '@/provider/contextProvider/BookmarkCombinedProvider';

export const BookmarkedPlaces = async ({ searchParams }: ParamsProps) => {
  const view = searchParams.view;
  const list = searchParams.list;
  const counts = await getBookmarkCounts();

  return (
    <BookmarkCombinedProvider>
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
    </BookmarkCombinedProvider>
  );
};
