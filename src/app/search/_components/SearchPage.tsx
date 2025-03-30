'use client';
import { useState, useEffect } from 'react';
import useSearch from '../_hook/useSearch';
import SearchBar from '../../_components/SearchBar';
import TabMenu from './TabMenu';
import { Button } from '@/components/atoms';
import { Card, FeedCard } from '@/components/molecules';
import { FilterType } from '@/types/SearchType';
import SearchSection from './SearchSection';

const normalizeFilter = (filter: string | undefined) => {
  const upper = filter?.toUpperCase() as string;
  return ['PLACES', 'POSTS', 'USERS', 'ALL'].includes(upper)
    ? (upper as FilterType)
    : 'ALL';
};

const SearchPage = ({
  keyword = '',
  filter,
}: {
  keyword?: string;
  filter: string | undefined;
}) => {
  const [searchFilter, setSearchFilter] = useState<FilterType>('ALL');

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
        {(searchFilter === 'ALL' || searchFilter === 'PLACES') && (
          <SearchSection
            title='에 맞는 맛집이에요'
            keyword={keyword}
            items={places}
            filter={searchFilter.toLowerCase()}
            renderItem={(item) => <Card key={item.id} place={item} />}
          />
        )}
        {(searchFilter === 'ALL' || searchFilter === 'POSTS') && (
          <SearchSection
            title='관련된 게시물이에요.'
            keyword={keyword}
            items={posts}
            filter={searchFilter.toLowerCase()}
            renderItem={(item) => <FeedCard key={item.postId} {...item} />}
          />
        )}
      </div>
    );
  }
};

export default SearchPage;
