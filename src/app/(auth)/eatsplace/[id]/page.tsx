import React from 'react';
import { ParamsProps } from '@/types/paramsType';
import { EatsPlaceDetailPage } from '../_components/EatsPlaceDetailPage';
import { url } from '../../myeats/_components/bookmark/AllBookmarkedPlaces';
type Params = { id: string };

const page = async ({ params }: { params: Params }) => {
  const data = {
    id: Number(params.id),
    placeName: '서울 부띠끄',
    url: url,
    popular: ['양식', '고르곤 졸라 피자', '탕후루'],
  };
  return <EatsPlaceDetailPage data={data} />;
};

export default page;
