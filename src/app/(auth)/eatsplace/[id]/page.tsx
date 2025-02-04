import React from 'react';
import { ParamsProps } from '@/types/paramsType';
import { EatsPlaceDetailPage } from '../_components/EatsPlaceDetailPage';

const page = async ({ searchParams }: ParamsProps) => {
  return <EatsPlaceDetailPage />;
};

export default page;
