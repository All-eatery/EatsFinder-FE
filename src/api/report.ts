import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { getUserToken } from '@/utils/getServerUserInfo';
import { KotlinResponseType } from '@/types/responseType';

export const submitReport = async (reasons, targetType, targetId) => {
  const token = await getUserToken();
  const res = await fetch(
    `${KOTLIN_SERVER}/reports/${targetType}/${targetId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reasons),
    },
  );

  console.log(res);

  const data = await res.json();

  return data;
};
