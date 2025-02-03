import React from 'react';
import { MyEatsPage } from './_components/MyEatsPage';
import { ParamsProps } from '@/types/paramsType';

const page = async ({ searchParams }: ParamsProps) => {
  //여기서 전체보기/리스트 갯수가져오기

  return <MyEatsPage searchParams={searchParams} />;
};

export default page;
