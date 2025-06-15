export type FilterType = 'Places' | 'Posts' | 'Users' | 'All';

export interface SearchPost {
  userId: number;
  postId: number;
  placeName: string;
  postThumbnailUrl: string;
  isPostLike: boolean;
  postLikeCount: number;
  profileImage: string;
  nickname: string;
  updatedAt: string;
}

export interface SearchPlace {
  placeId: number;
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
