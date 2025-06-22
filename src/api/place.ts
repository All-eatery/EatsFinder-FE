import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { PlacesInboundary } from '@/types/eatsPlaceType';

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
}): Promise<PlacesInboundary[]> => {
  const response = await fetch(
    `${KOTLIN_SERVER}/places/map?oa=${oa}&ha=${ha}&qa=${qa}&pa=${pa}`,
    {
      method: 'GET',
    },
  );
  const data = await response.json();
  console.log(data);
  return data;
};
