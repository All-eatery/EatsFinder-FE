import { getUserToken } from '@/utils/getServerUserInfo';
import { NEST_SERVER, KAKAO_REST_API_KEY } from '@/constants/baseUrl';

export const getNearByPlaces = async (local: string) => {
  const token = await getUserToken();
  const res = await fetch(`${NEST_SERVER}/places/${local}/local`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
