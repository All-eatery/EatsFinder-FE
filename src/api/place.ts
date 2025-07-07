import {
  KOTLIN_SERVER,
  NEST_SERVER,
  KAKAO_REST_API_KEY,
} from '@/constants/baseUrl';
import {
  GetPlacePostsType,
  PlaceByIdType,
  PlacesInboundaryType,
  PostsAboutPlaceType,
} from '@/types/eatsPlaceType';
import { getUserToken } from '@/utils/getServerUserInfo';

export const getPlacesInBoundary = async ({
  oa,
  ha,
  qa,
  pa,
}: {
  oa: number;
  ha: number;
  qa: number;
  pa: number;
}): Promise<PlacesInboundaryType[]> => {
  const response = await fetch(
    `${KOTLIN_SERVER}/places/map?oa=${oa}&ha=${ha}&qa=${qa}&pa=${pa}`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  return data;
};
export const getPlaceById = async (id: string): Promise<PlaceByIdType> => {
  const token = await getUserToken();
  const response = await fetch(`${NEST_SERVER}/places/${id}/details`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log('dsadsadasdasd', data);
  return data;
};
export const getPlacePosts = async ({
  id,
  cursor,
  sort = 'recent',
}: GetPlacePostsType): Promise<PostsAboutPlaceType> => {
  const token = await getUserToken();

  const response = await fetch(
    `${NEST_SERVER}/places/${id}/posts?cursor=${cursor}&sort=${sort}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await response.json();
  return data;
};

export const getNearByPlaces = async (local: string) => {
  const token = await getUserToken();
  const res = await fetch(`${NEST_SERVER}/places/${local}/local`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data;
};

export const getRegionCode = async (position: GeolocationPosition) => {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
    },
  );
  const data = await res.json();

  return data;
};
