import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import PostPage from './_components/PostPage';
import { getPostContent } from '@/api/post';
import {
  getComments,
  createComment,
  deleteComment,
  editComment,
} from '@/api/comment';

export default async function Post({ params }: { params: { postId: number } }) {
  const { postId } = params;

  const handleCreateComment = async (content: string) => {
    'use server';
    const data = await createComment(postId, content);

    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postId}`);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    'use server';
    await deleteComment(commentId);

    revalidatePath(`/posts/${postId}`);
  };

  const handleEditComment = async (commentId: number, content: string) => {
    'use server';
    const data = await editComment(commentId, content);

    if (data.statusCode === 'SUCCESS') {
      revalidatePath(`/posts/${postId}`);
    }
  };

  try {
    const postContent = await getPostContent(postId);
    const postComments = await getComments(postId);
    return (
      <>
        <PostPage
          postContent={postContent}
          postComments={postComments}
          handleCreateComment={handleCreateComment}
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
        />
      </>
    );
  } catch (err) {
    notFound();
  }
}
