import PostContent from './postContent';
import PostComment from './postComments';
import { PostContentType, PostCommentType } from '@/types/postType';

interface PostPageProps {
  postContent: PostContentType;
  postComments: PostCommentType;
  handleCreateComment: (content: string) => Promise<void>;
  handleDeleteComment: (commentId: number) => Promise<void>;
  handleEditComment: (commentId: number, content: string) => Promise<void>;
}

const PostPage = ({
  postContent,
  postComments,
  handleCreateComment,
  handleDeleteComment,
  handleEditComment,
}: PostPageProps) => {
  return (
    <>
      <PostContent postContent={postContent} />
      <PostComment
        postComments={postComments}
        handleCreateComment={handleCreateComment}
        handleDeleteComment={handleDeleteComment}
        handleEditComment={handleEditComment}
      />
    </>
  );
};

export default PostPage;
