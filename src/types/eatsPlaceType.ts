export type Coordinate = {
  lat: number;
  lng: number;
};
export type PlaceInfoProps = {
  id: number;
  placeName: string;
  url: string;
  popular: string[];
  lng: number;
  lat: number;
};
//추가되어야 하는 부분
export type PlacesInboundaryType = {
  id: number;
  name: string;
  lng: number;
  lat: number;
};
export type PlaceByIdType = {
  id: number;
  name: string;
  address: string;
  roadAddress: string;
  thumbnailUrl: string;
  keywordTag: string;
  menuNames: string[];
  x: number;
  y: number;
};
export type GetPlacePostsType = {
  id: number;
  sort: 'recent' | 'like';
  cursor: number;
};
export type PostsAboutPlaceType = {
  pagination: {
    totalItems: number;
    itemsPerPage: number;
  };
  items: [
    {
      id: number;
      thumbnailUrl: string;
      likeCount: number;
      isLiked: boolean;
      nickname: string;
      profileImage: string;
    },
  ];
  lastItemId: number;
};
