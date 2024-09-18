'use server';
import { UserData } from '@/types/authType';
import { cookies } from 'next/headers';

export const getServerUserInfo = async (): Promise<UserData | undefined> => {
  const data = cookies().get('userInfo');
  if (!data) {
    return undefined;
  }
  const userInfo: UserData = await JSON.parse(data.value);
  return userInfo;
};
export const getUserToken = async () => {
  const token = cookies().get('jwt')?.value;
  return token;
};
