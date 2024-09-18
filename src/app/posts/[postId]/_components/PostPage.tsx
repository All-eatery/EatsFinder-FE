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
import { getPostEditStatus } from '@/api/post';

interface PostPageProps {
  postContent: PostContentType;
  postComments: PostCommentType;
}

const PostPage = ({ postContent, postComments }: PostPageProps) => {
  const handleCreateComment = async (content: string) => {
    'use server';
    const data = await createComment(postContent.id, content);

    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postContent.id}`);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    'use server';
    await deleteComment(commentId);

    revalidatePath(`/posts/${postContent.id}`);
  };

  const handleEditComment = async (commentId: number, content: string) => {
    'use server';
    const data = await editComment(commentId, content);

    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postContent.id}`);
    }
  };

  const handleToggleCommentLike = async (
    commentId: number,
    isLiked: boolean,
  ) => {
    'use server';
    const data = await toggleCommentLike(commentId, isLiked);

    console.log(data);
  };

  const handleIsEditable = async () => {
    'use server';
    const data = await getPostEditStatus(postContent.id);

    if (data.statusCode !== 200) {
      return data.message;
    }

    redirect(`/post/new`);
  };
  return (
    <>
      <PostContent
        postContent={postContent}
        handleIsEditable={handleIsEditable}
      />
      <PostComment
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
