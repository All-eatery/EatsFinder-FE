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

export interface PlaceType {
  id: number;
  name: string;
  address: string;
  roadAddress: string;
  telephone: string;
  x: number;
  y: number;
  category: string;
  categoryName: string;
  categoryCode: string;
  thumbnailUrl: string;
}

export type PlaceRequestType = Omit<PlaceType, 'id' | 'thumbnailUrl'>;

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
