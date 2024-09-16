import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { PostCommentType } from '@/types/postType';

export const getComments = async (postId: number): Promise<PostCommentType> => {
  const res = await fetch(`${KOTLIN_SERVER}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
};

export const createComment = async (postId: number, content: string) => {
  const body = JSON.stringify({ content });

  const res = await fetch(`${KOTLIN_SERVER}/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });

  const data = await res.json();

  return data;
};

export const deleteComment = async (commentId: number) => {
  const res = await fetch(`${KOTLIN_SERVER}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  return data;
};
