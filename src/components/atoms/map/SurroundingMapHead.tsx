'use client';

import { getClientUserInfo } from '@/utils/getClientUserInfo';

export const SurroundingMapHead = ({ address }: { address: string }) => {
  const data = getClientUserInfo();
  return (
    <h2 className='text-gray-700 subTitle-16 sm:subTitle-18 lg:subTitle-28'>
      {data && data.nickname + ' '}주변의 맛집 ({address})
    </h2>
  );
};
