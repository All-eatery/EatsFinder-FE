'use client';
import { useState } from 'react';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import PostContent from './postContent';
import PostComment from './postComments';
import ReportModal from './postContent/ReportModal';
import {
  PostContentType,
  PostCommentType,
  ReportStateType,
} from '@/types/postType';
import { UserData } from '@/types/authType';
import {
  createComment,
  deleteComment,
  editComment,
  toggleCommentLike,
} from '@/api/comment';
import { togglePostLike } from '@/api/post';
import { getPostEditStatus, deletePost } from '@/api/post';

interface PostPageProps {
  userInfo?: UserData;
  postContent: PostContentType;
  postComments: PostCommentType;
}

const PostPage = ({ userInfo, postContent, postComments }: PostPageProps) => {
  const [reportState, setReportState] = useState<ReportStateType>({
    isOpen: false,
    targetType: null,
    targetId: null,
  });

  const handleOpenReportModal: (
    targetType: 'post' | 'comment' | 'reply',
    targetId: number,
  ) => void = (targetType, targetId) => {
    setReportState({
      isOpen: true,
      targetType: targetType,
      targetId: targetId,
    });
  };

  const handleCreateComment = async (
    content: string,
    isReply: boolean,
    commentId?: number,
  ) => {
    const targetId = commentId || postContent.id;
    const data = await createComment(targetId, content, isReply);

    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postContent.id}`);
    }
  };

  const handleDeleteComment = async (targetId: number, isReply: boolean) => {
    await deleteComment(targetId, isReply);

    revalidatePath(`/posts/${postContent.id}`);
  };

  const handleEditComment = async (
    targetId: number,
    content: string,
    isReply: boolean,
  ) => {
    const data = await editComment(targetId, content, isReply);

    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postContent.id}`);
    }
  };

  const handleToggleCommentLike = async (
    commentId: number,
    isLiked: boolean,
    isReply: boolean,
  ) => {
    const data = await toggleCommentLike(commentId, isLiked, isReply);
    if (data.statusCode === 403) {
      redirect(`/posts/${postContent.id}?login=false`);
    }
    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postContent.id}`);
    }
  };

  const handleIsEditable = async () => {
    const data = await getPostEditStatus(postContent.id);

    if (data.statusCode !== 200) {
      return data.message;
    }

    redirect(`/post/new`);
  };

  const handleDeletePost = async () => {
    const data = await deletePost(postContent.id);
    if (data.statusCode === 200) {
      redirect('/');
    }
  };

  const handleTogglePostLike = async (targetId: number, isLiked: boolean) => {
    const data = await togglePostLike(targetId, isLiked);

    revalidatePath(`/posts/${postContent.id}`);
  };

  return (
    <>
      <PostContent
        userInfo={userInfo}
        postContent={postContent}
        handleIsEditable={handleIsEditable}
        handleDeletePost={handleDeletePost}
        handleTogglePostLike={handleTogglePostLike}
        handleOpenReportModal={handleOpenReportModal}
      />
      <PostComment
        userInfo={userInfo}
        postComments={postComments}
        handleCreateComment={handleCreateComment}
        handleDeleteComment={handleDeleteComment}
        handleEditComment={handleEditComment}
        handleToggleCommentLike={handleToggleCommentLike}
        handleOpenReportModal={handleOpenReportModal}
      />
      <ReportModal reportState={reportState} setReportState={setReportState} />
    </>
  );
};

export default PostPage;
