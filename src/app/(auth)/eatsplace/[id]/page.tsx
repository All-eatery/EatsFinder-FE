import React from 'react';
import { ParamsProps } from '@/types/paramsType';
import { EatsPlacePage } from './_components/EatsPlacePage';

const page = async ({ searchParams }: ParamsProps) => {
  return <EatsPlacePage />;
};

export default page;
