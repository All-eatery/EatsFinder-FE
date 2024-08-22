import { ProfileImage } from '@/components/atoms';
import { Comment, Search } from '@/components/molecules';
import { CommentType } from '@/types/comment';

interface PostCommentsProps {
  postComments: CommentType[];
}

const example = new Array(4).fill(0);

const PostComments = ({ postComments }: PostCommentsProps) => {
  return (
    <section className='flex flex-col gap-6'>
      <div>
        <h2 className='text-gray-700 subTitle-28'>댓글(4개)</h2>
      </div>
      <div className='flex gap-6'>
        <ProfileImage size={60} />
        <Search searchIcon={false} placeholder='댓글 추가' className='w-full' />
      </div>
      <div>
        {postComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default PostComments;
