import React from 'react';
import { EatsPlaceDetailPage } from '../_components/EatsPlaceDetailPage';
import { url } from '../../myeats/_components/bookmark/AllBookmarkedPlaces';
type Params = { id: string };

const page = async ({ params }: { params: Params }) => {
  const data = {
    id: Number(params.id),
    placeName: '서울 부띠끄',
    url: url,
    popular: ['양식', '고르곤 졸라 피자', '탕후루'],
    lng: 127.088125,
    lat: 37.152724,
  };
  return <EatsPlaceDetailPage data={data} />;
};

export default page;
