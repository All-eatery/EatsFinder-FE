export interface PlaceDetail {
  id: number;
  name: string;
  categories: { name: string };
  roadAddress: string;
  starRatings: number | null;
  bookmarkStatus: boolean;
  posts: { thumbnailUrl: string }[];
}

export interface PlaceCard {
  postThumbnailUrl: string;
  placeName: string;
  roadAddress: string;
  starRating: number;
  category: string;
  isBookmark: boolean;
  updatedAt: string;
  likeCount: number;
}
