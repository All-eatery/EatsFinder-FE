import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { PostCommentType } from '@/types/postType';
import { KotlinResponseType } from '@/types/responseType';
import { CommentLikeType } from '@/types/comment';
import { getUserToken } from '@/utils/getServerUserInfo';

export const getComments = async (
  postId: number,
): Promise<KotlinResponseType<PostCommentType>> => {
  const token = await getUserToken();
  const res = await fetch(`${KOTLIN_SERVER}/posts/${postId}/comments`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
};

export const createComment = async (
  postId: number,
  content: string,
): Promise<KotlinResponseType<string>> => {
  const token = await getUserToken();
  const body = JSON.stringify({ content });

  const res = await fetch(`${KOTLIN_SERVER}/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  const data = await res.json();

  return data;
};

export const deleteComment = async (commentId: number) => {
  const token = await getUserToken();
  const res = await fetch(`${KOTLIN_SERVER}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editComment = async (
  commentId: number,
  content: string,
): Promise<KotlinResponseType<string>> => {
  const token = await getUserToken();
  const body = JSON.stringify({ content: content });

  const res = await fetch(`${KOTLIN_SERVER}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body,
  });

  const data = await res.json();

  return data;
};

export const toggleCommentLike = async (
  commentId: number,
  isLiked: boolean,
): Promise<KotlinResponseType<CommentLikeType>> => {
  const token = await getUserToken();
  const res = await fetch(`${KOTLIN_SERVER}/comment-likes/${commentId}`, {
    method: isLiked ? 'DELETE' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
};
