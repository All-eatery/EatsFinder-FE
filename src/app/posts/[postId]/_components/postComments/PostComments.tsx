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
  handleCreateComment: (
    content: string,
    isReply: boolean,
    commentId?: number,
  ) => Promise<void>;
  handleDeleteComment: (targetId: number, isReply: boolean) => Promise<void>;
  handleEditComment: (
    targetId: number,
    content: string,
    isReply: boolean,
  ) => Promise<void>;
  handleToggleCommentLike: (
    commentId: number,
    isLiked: boolean,
    isReply: boolean,
  ) => Promise<void>;
  handleOpenReportModal: (
    targetType: 'post' | 'comment' | 'reply',
    targetId: number,
  ) => void;
}

const PostComments = ({
  userInfo,
  postComments,
  handleCreateComment,
  handleDeleteComment,
  handleEditComment,
  handleToggleCommentLike,
  handleOpenReportModal,
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
              handleCreateComment(content, false);
              setContent('');
            }
          }}
          onSearch={() => {
            handleCreateComment(content, false);
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
            handleCreateComment={handleCreateComment}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            handleToggleCommentLike={handleToggleCommentLike}
            handleOpenReportModal={handleOpenReportModal}
          />
        ))}
      </div>
    </section>
  );
};

export default PostComments;
