import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { PostCommentType } from '@/types/postType';
import { KotlinResponseType } from '@/types/responseType';
import { CommentLikeType } from '@/types/comment';
import { getUserToken } from '@/utils/getServerUserInfo';

export const getComments = async (postId: number): Promise<PostCommentType> => {
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
  targetId: number,
  content: string,
  isReply: boolean,
): Promise<KotlinResponseType<string>> => {
  const token = await getUserToken();
  const body = JSON.stringify({ content });
  const endpont = !isReply
    ? `${KOTLIN_SERVER}/posts/${targetId}/comments`
    : `${KOTLIN_SERVER}/comments/${targetId}/replies`;
  const res = await fetch(endpont, {
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

export const deleteComment = async (targetId: number, isReply: boolean) => {
  const token = await getUserToken();
  const endpoint = !isReply
    ? `${KOTLIN_SERVER}/comments/${targetId}`
    : `${KOTLIN_SERVER}/replies/${targetId}`;
  const res = await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const editComment = async (
  targetId: number,
  content: string,
  isReply: boolean,
): Promise<KotlinResponseType<string>> => {
  const token = await getUserToken();
  const body = JSON.stringify({ content: content });
  const endpoint = !isReply
    ? `${KOTLIN_SERVER}/comments/${targetId}`
    : `${KOTLIN_SERVER}/replies/${targetId}`;
  const res = await fetch(endpoint, {
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
  targetId: number,
  isLiked: boolean,
  isReply: boolean,
): Promise<KotlinResponseType<string>> => {
  const token = await getUserToken();
  const method = isLiked ? 'DELETE' : 'POST';
  const endpoint = !isReply
    ? `${KOTLIN_SERVER}/comment-likes?commentId=${targetId}`
    : `${KOTLIN_SERVER}/reply-likes?replyId=${targetId}`;
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
