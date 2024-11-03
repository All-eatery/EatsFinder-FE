import { redirect } from 'next/navigation';
import PostContent from './postContent';
import PostComment from './postComments';
import { PostContentType, PostCommentType } from '@/types/postType';
import { revalidatePath } from 'next/cache';
import {
  createComment,
  deleteComment,
  editComment,
  toggleCommentLike,
} from '@/api/comment';
import { getPostEditStatus, deletePost } from '@/api/post';
import { UserData } from '@/types/authType';

interface PostPageProps {
  userInfo?: UserData;
  postContent: PostContentType;
  postComments: PostCommentType;
}

const PostPage = ({ userInfo, postContent, postComments }: PostPageProps) => {
  const handleCreateComment = async (
    content: string,
    isReply: boolean,
    commentId?: number,
  ) => {
    'use server';
    const targetId = commentId || postContent.id;
    const data = await createComment(targetId, content, isReply);

    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postContent.id}`);
    }
  };

  const handleDeleteComment = async (targetId: number, isReply: boolean) => {
    'use server';
    await deleteComment(targetId, isReply);

    revalidatePath(`/posts/${postContent.id}`);
  };

  const handleEditComment = async (
    targetId: number,
    content: string,
    isReply: boolean,
  ) => {
    'use server';
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
    'use server';
    const data = await toggleCommentLike(commentId, isLiked, isReply);
    if (data.statusCode === 403) {
      redirect(`/posts/${postContent.id}?login=false`);
    }
    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postContent.id}`);
    }
  };

  const handleIsEditable = async () => {
    'use server';
    const data = await getPostEditStatus(postContent.id);

    if (data.statusCode !== 200) {
      return data.message;
    }

    redirect(`/post/new`);
  };

  const handleDeletePost = async () => {
    'use server';
    const data = await deletePost(postContent.id);
    if (data.statusCode === 200) {
      redirect('/');
    }
  };

  return (
    <>
      <PostContent
        userInfo={userInfo}
        postContent={postContent}
        handleIsEditable={handleIsEditable}
        handleDeletePost={handleDeletePost}
      />
      <PostComment
        userInfo={userInfo}
        postComments={postComments}
        handleCreateComment={handleCreateComment}
        handleDeleteComment={handleDeleteComment}
        handleEditComment={handleEditComment}
        handleToggleCommentLike={handleToggleCommentLike}
      />
    </>
  );
};

export default PostPage;
