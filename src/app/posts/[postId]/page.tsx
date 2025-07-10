import { notFound } from 'next/navigation';
import PostPage from './_components/PostPage';
import { getPostContent } from '@/api/post';
import { getComments } from '@/api/comment';
import { getServerUserInfo } from '@/utils/getServerUserInfo';

export default async function Post({ params }: { params: { postId: number } }) {
  const { postId } = params;

  try {
    const postContent = await getPostContent(postId);
    const postComments = await getComments(postId);
    const userInfo = await getServerUserInfo();

    return (
      <>
        <PostPage
          userInfo={userInfo}
          postContent={postContent}
          postComments={postComments}
        />
      </>
    );
  } catch (err) {
    notFound();
  }
}
