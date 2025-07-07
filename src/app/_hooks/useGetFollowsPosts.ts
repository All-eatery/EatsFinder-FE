import {
  useInfiniteQuery,
  InfiniteData,
  QueryKey,
} from '@tanstack/react-query';
import { getFollowsPosts } from '@/api/post';

interface FollowPostsData {
  pagination: {
    totalItems: number;
    itemsPerPage: number;
    totalPage: number;
    currentPage: number;
    isLastPage: boolean;
  };
  followingCount: number;
  neighborPost: {
    followingUser: {
      nickname: String;
      profileImage: string;
    };
    placeName: string;
    postId: number;
    postThumbnailUrl: string;
    isPostLike: boolean;
    postLikeCount: number;
    updatedAt: string;
  }[];
}

export const useGetFollowsPosts = () => {
  const { data, isLoading, ...rest } = useInfiniteQuery<
    FollowPostsData,
    Error,
    InfiniteData<FollowPostsData, unknown>,
    QueryKey,
    number
  >({
    queryKey: ['getFollowsPosts'],
    queryFn: ({ pageParam }) => {
      const data = getFollowsPosts(pageParam);

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { isLastPage, currentPage } = lastPage.pagination;
      if (isLastPage) {
        return undefined;
      }

      return currentPage + 1;
    },
  });

  return { data, isLoading, ...rest };
};
