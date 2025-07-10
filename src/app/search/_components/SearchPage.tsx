'use client';
import { useState, useEffect } from 'react';
import useSearch from '../_hook/useSearch';
import SearchBar from '../../_components/SearchBar';
import TabMenu from './TabMenu';
import { Card, FeedCard } from '@/components/molecules';
import { FilterType } from '@/types/SearchType';
import SearchSection from './SearchSection';

const normalizeFilter = (filter: string | undefined): FilterType => {
  if (!filter) return 'All';

  const formatted =
    filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();

  const validFilters: FilterType[] = ['All', 'Users', 'Posts', 'Places'];
  return validFilters.includes(formatted as FilterType)
    ? (formatted as FilterType)
    : 'All';
};

const SearchPage = ({
  keyword = '',
  filter,
}: {
  keyword?: string;
  filter: string | undefined;
}) => {
  const [searchFilter, setSearchFilter] = useState<FilterType>('All');

  useEffect(() => {
    setSearchFilter(normalizeFilter(filter));
  }, [filter]);

  const { data } = useSearch(keyword, searchFilter);

  if (data) {
    const { posts, places, neighbors } = data;

    return (
      <div className='mb-20 flex flex-col gap-20'>
        <SearchBar />
        <TabMenu />
        {searchFilter === 'All' || searchFilter === 'Places' ? (
          <SearchSection
            title='에 맞는 맛집이에요'
            keyword={keyword}
            items={places}
            filter={searchFilter.toLowerCase()}
            renderItem={(item) => {
              const {
                placeId,
                postThumbnailUrl,
                placeName,
                roadAddress,
                starRating,
                category,
                isBookmark,
              } = item;

              return (
                <Card
                  key={placeId}
                  place={{
                    id: placeId,
                    name: placeName,
                    categories: { name: category },
                    roadAddress: roadAddress,
                    starRatings: starRating,
                    bookmarkStatus: isBookmark,
                    posts: [{ thumbnailUrl: postThumbnailUrl }],
                  }}
                />
              );
            }}
          />
        ) : null}

        {(searchFilter === 'All' || searchFilter === 'Posts') && (
          <SearchSection
            title='관련된 게시물이에요.'
            keyword={keyword}
            items={posts}
            filter={searchFilter.toLowerCase()}
            renderItem={(item) => <FeedCard key={item.postId} {...item} />}
          />
        )}

        {/* {(searchFilter === 'All' || searchFilter === 'Users') && (
          <SearchSection
            title='을 작성한 이웃들이에요.'
            keyword={keyword}
            items={neighbors}
            filter={searchFilter.toLowerCase()}
            renderItem={(item) => {
              // 사용자 카드 렌더링 방식 여기에 작성
              return <div key={item.userId}>{item.nickname}</div>;
            }}
          />
        )} */}
      </div>
    );
  }
};

export default SearchPage;
