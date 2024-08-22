import PostContent from './postContent';
import PostComment from './postComments';
import { PostContentType } from '@/types/postType';
import { CommentType } from '@/types/comment';

interface PostPageProps {
  postContent: PostContentType;
  postComments: CommentType[];
}

const PostPage = ({ postContent, postComments }: PostPageProps) => {
  return (
    <>
      <PostContent postContent={postContent} />
      <PostComment postComments={postComments} />
    </>
  );
};

export default PostPage;
