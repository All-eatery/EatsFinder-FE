'use client';
import { useState } from 'react';
import { ProfileImage } from '@/components/atoms';
import { Comment, Search } from '@/components/molecules';
import { PostCommentType } from '@/types/postType';

interface PostCommentsProps {
  postComments: PostCommentType;
  handleCreateComment: (content: string) => Promise<void>;
}

const PostComments = ({
  postComments,
  handleCreateComment,
}: PostCommentsProps) => {
  const [content, setContent] = useState('');

  return (
    <section className='flex flex-col gap-6'>
      <div>
        <h2 className='text-gray-700 subTitle-28'>{`댓글(${postComments.totalCommentCount})`}</h2>
      </div>
      <div className='flex gap-6'>
        <ProfileImage size={60} />
        <Search
          searchIcon={false}
          placeholder='댓글 추가'
          className='w-full'
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) {
              return;
            }
            if (e.code === 'Enter') {
              handleCreateComment(content);
              setContent('');
            }
          }}
          onSearch={() => {
            handleCreateComment(content);
            setContent('');
          }}
        />
      </div>
      <div>
        {postComments.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default PostComments;
