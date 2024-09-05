import { notFound } from 'next/navigation';
import PostPage from './_components/PostPage';
import { getPostContent } from '@/api/post';

export default async function Post({ params }: { params: { postId: string } }) {
  const { postId } = params;
  try {
    const postContent = await getPostContent(postId);

    return (
      <>
        <PostPage postContent={postContent} />
      </>
    );
  } catch (err) {
    console.log(err);
    notFound();
  }
}
