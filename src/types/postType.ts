import { PlaceType } from './kakaomapType';

export interface PostContentType {
  id: number;
  content: string;
  thumbnailUrl: string;
  imageUrl: string | null;
  menuTag: string[];
  keywordTag: string;
  likeCount: number;
  createdAt: string;
  users: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
  places: PlaceType;
  starRatings: number;
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

export interface PostCardType {
  postId: 0;
  placeName: string;
  postThumbnailUrl: string;
  isPostLike: true;
  postLikeCount: number;
  profileImage: string;
  nickname: string;
}
