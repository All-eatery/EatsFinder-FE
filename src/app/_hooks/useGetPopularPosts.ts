import { useQuery } from '@tanstack/react-query';
import { getPopularPosts } from '@/api/post';

export const useGetPopularPosts = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['getPopularPosts'],
    queryFn: getPopularPosts,
  });

  return { data, ...rest };
};
