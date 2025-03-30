export type FilterType = 'PLACES' | 'POSTS' | 'USERS' | 'ALL';

export interface SearchPost {
  userId: number;
  userImageUrl: string;
  placeName: string;
  postId: number;
  postThumbnailUrl: string;
  isPostLike: boolean;
  postLikeCount: number;
  updatedAt: string;
}

export interface SearchPlace {
  postThumbnailUrl: string;
  placeName: string;
  roadAddress: string;
  starRating: number;
  category: string;
  isBookmark: boolean;
  updatedAt: string;
  likeCount: number;
}

export interface SearchNeighbor {
  imageUrl: string;
  nickname: string;
  postCount: number;
  follower: number;
  isFollow: boolean;
}

export interface SearchResult {
  posts: SearchPost[];
  places: SearchPlace[];
  neighbors: SearchNeighbor[];
}
