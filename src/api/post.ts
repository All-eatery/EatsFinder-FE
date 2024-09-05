import { NEST_SERVER } from '@/constants/baseUrl';
import { PostContentType, PlaceRequestType } from '@/types/postType';
import { getUserToken } from '@/utils/getServerUserInfo';

export const createNewPost = async (formData: FormData) => {
  const token = await getUserToken();
  const res = await fetch(`${NEST_SERVER}/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  console.log(data);
  return data;
};

export const getPostContent = async (
  postId: string,
): Promise<PostContentType> => {
  const res = await fetch(`${NEST_SERVER}/posts/${postId}/details`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (data.statusCode === 404) {
    throw new Error(data.message);
  }

  return data;
};

export const createPlace = async (place: PlaceRequestType) => {
  const res = await fetch(`${NEST_SERVER}/places`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(place),
  });

  const data = await res.json();

  return data;
};

export const getPlace = async (placeName: string) => {
  if (!placeName) return;

  const res = await fetch(`${NEST_SERVER}/places/${placeName}/name`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
};

export const getKakaoPlace = async (placeName: string) => {
  if (!placeName) return;

  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword?category_group_code=FD6,CE7&size=15&query=${placeName}`,
    {
      method: 'GET',
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    },
  );

  const data = await res.json();

  return data;
};

export const getMenus = async (placeId: number) => {
  const res = await fetch(`${NEST_SERVER}/menus/${placeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
};

export const createMenu = async (menu: string, placeId: number) => {
  const res = await fetch(`${NEST_SERVER}/menus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ menu, placeId }),
  });

  const data = await res.json();

  return data;
};
