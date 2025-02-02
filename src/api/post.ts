import { NEST_SERVER, KOTLIN_SERVER } from '@/constants/baseUrl';
import { PostContentType, PlaceRequestType } from '@/types/postType';
import { getUserToken } from '@/utils/getServerUserInfo';
import { NestResponseType, KotlinResponseType } from '@/types/responseType';

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
  postId: number,
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

export const getPostEditStatus = async (
  postId: number,
): Promise<NestResponseType> => {
  const res = await fetch(`${NEST_SERVER}/posts/${postId}/check`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
};

export const deletePost = async (postId: number) => {
  const token = await getUserToken();
  const response = await fetch(`${NEST_SERVER}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return { data, response };
};

export const togglePostLike = async (
  targetId: number,
  isLiked: boolean,
): Promise<KotlinResponseType<string>> => {
  const token = await getUserToken();
  const method = isLiked ? 'DELETE' : 'POST';

  const endpoint = `${KOTLIN_SERVER}/post-likes?postId=${targetId}`;
  const res = await fetch(endpoint, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok)
    return { statusCode: res.status, data: '', message: res.statusText };

  const data = await res.json();

  return data;
};
