import { ActiveDataType, ActiveType, SimplifiedData } from '@/types/authType';

const typeMessages: Record<ActiveType, string> = {
  POST_LIKES: '님의 게시물에 좋아요를 눌렀어요.',
  COMMENT_LIKES: '님의 댓글',
  COMMENT: '님의 게시물에 남긴 댓글',
  REPLY: '님의 댓글에 남긴 대댓글',
  REPLY_LIKES: '님의 대댓글',
};
export const simplifyTimeLineData = (data: ActiveDataType): SimplifiedData => {
  const { type, createdAt } = data;

  switch (type) {
    case 'COMMENT':
      return {
        type: 'comment',
        id: data.comment!.id,
        postId: data.comment!.postId,
        postUserNickname: data.comment!.createdBy.postUserNickname,
        postImageUrl: data.comment?.createdBy.postImageUrl || '',
        typeMessage: typeMessages['COMMENT'],
        content: data.comment!.content,
        createdAt,
      };
    case 'REPLY':
      return {
        type: 'reply',
        id: data.reply!.id,
        postId: data.reply!.commentId,
        postUserNickname: data.reply!.createdBy.replyUserNickname,
        postImageUrl: data.reply?.createdBy.replyImageUrl || '',
        typeMessage: typeMessages['REPLY'],
        content: data.reply!.content,
        createdAt,
      };
    case 'POST_LIKES':
      return {
        type: 'postLike',
        id: data.postLike!.postId,
        postId: data.postLike!.postId,
        postUserNickname: data.postLike!.createdBy.postUserNickname,
        postImageUrl: data.postLike?.createdBy.postImageUrl || '',
        typeMessage: typeMessages['POST_LIKES'],
        createdAt,
      };

    case 'COMMENT_LIKES':
      return {
        type: 'commentLike',
        id: data.commentLike!.commentId,
        postId: data.commentLike!.postId,
        postUserNickname: data.commentLike!.createdBy.commentUserNickname,
        postImageUrl: data.commentLike?.createdBy.commentUserImageUrl || '',
        typeMessage: typeMessages['COMMENT_LIKES'],
        content: data.commentLike!.commentContent,
        createdAt,
      };

    case 'REPLY_LIKES':
      return {
        type: 'replyLikes',
        id: data.replyLike!.replyId,
        postId: data.replyLike!.replyId,
        postUserNickname: data.replyLike!.createdBy.replyUserNickname,
        postImageUrl: data.replyLike?.createdBy.replyImageUrl || '',
        typeMessage: typeMessages['REPLY_LIKES'],
        content: data.replyLike!.replyContent,
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
