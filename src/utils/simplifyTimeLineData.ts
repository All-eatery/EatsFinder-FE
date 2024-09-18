import { Active, ActiveType, SimplifiedData } from '@/types/authType';

const typeMessages: Record<ActiveType, string> = {
  postLike: '님의 게시물에 좋아요를 눌렀어요.',
  commentLike: '님의 댓글',
  comment: '님의 게시물에 남긴 댓글',
};
export const simplifyTimeLineData = (
  data: Active['data'][0],
): SimplifiedData => {
  const { type, createdAt } = data;

  switch (type) {
    case 'postLike':
      return {
        type: 'postLike',
        id: data.postLike!.postId,
        postId: data.postLike!.postId,
        postUserNickname: data.postLike!.createdBy.postUserNickname,
        postImageUrl: data.postLike?.createdBy.postImageUrl || '',
        typeMessage: typeMessages['postLike'],
        createdAt,
      };

    case 'commentLike':
      return {
        type: 'commentLike',
        id: data.commentLike!.commentId,
        postId: data.commentLike!.postId,
        postUserNickname: data.commentLike!.createdBy.commentUserNickname,
        postImageUrl: data.commentLike?.createdBy.commentUserImageUrl || '',
        typeMessage: typeMessages['commentLike'],
        content: data.commentLike!.commentContent,
        createdAt,
      };

    case 'comment':
      return {
        type: 'comment',
        id: data.comment!.id,
        postId: data.comment!.postId,
        postUserNickname: data.comment!.createdBy.postUserNickname,
        postImageUrl: data.comment?.createdBy.postImageUrl || '',
        typeMessage: typeMessages['comment'],
        content: data.comment!.content,
        createdAt,
      };

    default:
      return {
        type: 'unknown',
        id: 0,
        postId: 0,
        postUserNickname: '',
        postImageUrl: '',
        typeMessage: '',
        content: '',
        createdAt,
      };
  }
};
