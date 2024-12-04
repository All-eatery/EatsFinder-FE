export type BookmarkedLisdtsType = {
  pagination: {
    totalItems: number;
    itemsPerPage: number;
  };
  items: [
    {
      id: number;
      title: string;
      count: number;
      bookmarkPlaces: [
        {
          thumbnailUrl: string;
        },
      ];
    },
  ];
  lastItemId: number;
};
export type BookmarkedPlacesType = {
  pagination: {
    totalItems: number;
    itemsPerPage: number;
  };
  items: [
    {
      id: number;
      places: {
        id: number;
        name: string;
        roadAddress: string;
        depth2: string;
        thumbnailUrl: string;
      };
    },
  ];
  lastItemId: number;
};
