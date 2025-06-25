import { KOTLIN_SERVER, NEST_SERVER } from '@/constants/baseUrl';
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
  const response = await fetch(`${NEST_SERVER}/places/${id}/details`, {
    method: 'GET',
  });
  const data = await response.json();
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
