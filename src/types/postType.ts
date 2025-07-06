import { CommentType } from './comment';
import { PlaceType } from './kakaomapType';

export interface PostContentType {
  id: number;
  content: string;
  thumbnailUrl: string;
  imageUrl: string | null;
  menuTag: string[];
  keywordTag: string;
  likeCount: number;
  viewCount: number;
  createdAt: string;
  users: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
  places: PlaceType;
  starRatings: number;
  likeStatus: boolean;
}

export interface PostPaginationType {
  pagination: {
    totalItems: number;
    itemsPerPage: number;
  };
  items: [
    {
      id: number;
      thumbnailUrl: string;
      users: {
        nickname: string;
        profileImage: string;
      };
      likeStatus: boolean;
    },
  ];
  lastItemId: 321;
}

export type PlaceRequestType = Omit<
  PlaceType,
  'id' | 'thumbnailUrl' | 'categories'
>;

export interface KakaoPlaceType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface PostCommentType {
  totalCommentCount: number;
  comments: CommentType[];
}

export interface ReportStateType {
  isOpen: boolean;
  targetType: 'posts' | 'comments' | 'replies' | null;
  targetId: number | null;
}

export interface NeighborPost {
  followingUser: {
    nickname: string;
    profileImage: string;
  };
  placeName: string;
  postId: number;
  postThumbnamilUrl: string;
  isPostLike: boolean;
  postLikeCount: number;
  updatedAt: string;
}

export interface Pagination {
  totalPosts: number;
  postsPerPage: number;
  totalPage: number;
  currentPage: number;
  isLastPage: boolean;
}

export interface PostCardType {
  postId: number;
  placeName: string;
  postThumbnailUrl: string;
  isPostLike: boolean;
  postLikeCount: number;
  profileImage: string;
  nickname: string;
}
export interface FeedCardProps {
  id: number;
  thumbnailUrl: string;
  likeCount: number;
  isLiked: boolean;
  nickname: string;
  profileImage: string;
}
