import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { getUserToken } from '@/utils/getServerUserInfo';
import { FilterType } from '@/types/SearchType';

export const getSearchResult = async (keyword: string, filter: FilterType) => {
  const token = await getUserToken();
  const res = await fetch(
    `${KOTLIN_SERVER}/search?keyword=${keyword}&filter=${filter}`,
    {
      method: 'GET',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return data;
};
