export interface PlaceDetail {
  id: number;
  name: string;
  categories: { name: string };
  roadAddress: string;
  starRatings: number | null;
  bookmarkStatus: boolean;
  posts: { thumbnailUrl: string }[];
}
