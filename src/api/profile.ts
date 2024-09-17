import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { UserData } from '@/types/authType';
type Result<T, E> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: E };

export const getUserProfile = async (
  id: string,
): Promise<Result<UserData, string>> => {
  try {
    const response = await fetch(`${KOTLIN_SERVER}/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.statusCode) {
      return { isSuccess: false, error: '존재하지 않는 유저입니다' };
    }
    return { isSuccess: true, data };
  } catch (error) {
    return { isSuccess: false, error: '유저정보조회 에러' };
  }
};
