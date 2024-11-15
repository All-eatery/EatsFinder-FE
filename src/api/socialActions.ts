import { KOTLIN_SERVER } from '@/constants/baseUrl';
import { SocialActionsType } from '@/types/authType';
import { getUserToken } from '@/utils/getServerUserInfo';

export const socialAction = async ({ method, type, id }: SocialActionsType) => {
  const token = await getUserToken();
  const query = (() => {
    switch (type) {
      case 'comment':
        return 'commentId';
      case 'follow':
        return method === 'connect' ? 'followUserId' : 'unfollowUserId';
      // return 'followUserId';
      case 'post':
        return 'postId';
      case 'reply':
        return 'replyId';
    }
  })();
  const endpoint = (() => {
    switch (type) {
      case 'comment':
        return 'comment-likes';
      case 'follow':
        return 'follows';
      case 'post':
        return 'post-likes';
      case 'reply':
        return 'reply-likes';
    }
  })();
  const response = await fetch(`${KOTLIN_SERVER}/${endpoint}?${query}=${id}`, {
    method: method === 'connect' ? 'POST' : 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};
