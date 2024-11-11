import React from 'react';
import { ParamsProps } from '@/types/paramsType';
import { EatsHubPage } from './_components/EatsHubPage';

const page = async ({ searchParams }: ParamsProps) => {
  return <EatsHubPage />;
};

export default page;
