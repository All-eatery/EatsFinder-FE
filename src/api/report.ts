import { getUserToken } from '@/utils/getServerUserInfo';

export const submitReport = async (
  reasons: any,
  targetType: string,
  targetId: number,
) => {
  const token = await getUserToken();

  const res = await fetch(
    `api/report?targetType=${targetType}&targetId=${targetId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reasons),
    },
  );

  const data = await res.json();

  return data;
};
