import { useQuery } from '@tanstack/react-query';
import { getPopularKeywords } from '@/api/search';

export const useGetPopularKeywords = () => {
  const { data, ...rest } = useQuery<string[]>({
    queryKey: ['getPopularKeywords'],
    queryFn: getPopularKeywords,
  });

  return { data, ...rest };
};
