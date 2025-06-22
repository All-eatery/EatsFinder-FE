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
export interface FeedCardProps {
  id: number;
  thumbnailUrl: string;
  likeCount: number;
  isLiked: boolean;
  nickname: string;
  profileImage: string;
}
