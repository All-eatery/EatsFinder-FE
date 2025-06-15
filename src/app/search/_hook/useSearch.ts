import { useQuery } from '@tanstack/react-query';
import { getSearchResult } from '@/api/search';
import { SearchResult, FilterType } from '@/types/SearchType';

type SearchQueryKey = [string, { keyword: string; filter: FilterType }];

const useSearch = (keyword: string, filter: FilterType) => {
  return useQuery<SearchResult, Error, SearchResult, SearchQueryKey>({
    queryKey: ['searchResult', { keyword, filter }],
    queryFn: async ({ queryKey }) => {
      const [, { keyword, filter }] = queryKey;
      const data = await getSearchResult(keyword, filter);
      return {
        posts: data.posts,
        places: data.places,
        neighbors: data.neighbors,
      };
    },
  });
};

export default useSearch;
