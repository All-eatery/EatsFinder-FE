import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { CommentType } from '@/types/comment';

export const getComments = async (postId: string): Promise<CommentType[]> => {
  const res = await fetch(`${KOTLIN_SERVER}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
};
