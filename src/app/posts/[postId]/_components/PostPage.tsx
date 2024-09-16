import PostContent from './postContent';
import PostComment from './postComments';
import { PostContentType, PostCommentType } from '@/types/postType';

interface PostPageProps {
  postContent: PostContentType;
  postComments: PostCommentType;
  handleCreateComment: (content: string) => Promise<void>;
}

const PostPage = ({
  postContent,
  postComments,
  handleCreateComment,
}: PostPageProps) => {
  return (
    <>
      <PostContent postContent={postContent} />
      <PostComment
        postComments={postComments}
        handleCreateComment={handleCreateComment}
      />
    </>
  );
};

export default PostPage;
