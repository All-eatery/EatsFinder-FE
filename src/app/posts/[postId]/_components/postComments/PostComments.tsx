'use client';
import { useState } from 'react';
import { ProfileImage } from '@/components/atoms';
import { Search } from '@/components/molecules';
import { Comment } from './comment';
import { PostCommentType } from '@/types/postType';
import { UserData } from '@/types/authType';

interface PostCommentsProps {
  userInfo?: UserData;
  postComments: PostCommentType;
  handleCreateComment: (content: string) => Promise<void>;
  handleDeleteComment: (commentId: number) => Promise<void>;
  handleEditComment: (commentId: number, content: string) => Promise<void>;
  handleToggleCommentLike: (
    commentId: number,
    isLiked: boolean,
  ) => Promise<void>;
}

const PostComments = ({
  userInfo,
  postComments,
  handleCreateComment,
  handleDeleteComment,
  handleEditComment,
  handleToggleCommentLike,
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
          <Comment
            key={comment.id}
            userInfo={userInfo}
            comment={comment}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            handleToggleCommentLike={handleToggleCommentLike}
          />
        ))}
      </div>
    </section>
  );
};

export default PostComments;
