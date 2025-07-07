'use client';
import { useState } from 'react';
import { ProfileImage } from '@/components/atoms';
import { Search } from '@/components/molecules';

interface ReplyInputProps {
  commentId: number;
  handleCreateComment: (
    content: string,
    isReply: boolean,
    commentId?: number,
  ) => Promise<void>;
}

const ReplyInput = ({ commentId, handleCreateComment }: ReplyInputProps) => {
  const [replyContent, setReplyContent] = useState('');

  return (
    <div className='flex gap-6'>
      <ProfileImage size={60} />
      <Search
        searchIcon={false}
        placeholder='댓글 추가'
        className='w-full'
        value={replyContent}
        onChange={(e) => {
          setReplyContent(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) {
            return;
          }
          if (e.code === 'Enter') {
            handleCreateComment(replyContent, true, commentId);
            setReplyContent('');
          }
        }}
        onSearch={() => {
          handleCreateComment(replyContent, true, commentId);
          setReplyContent('');
        }}
      />
    </div>
  );
};

export default ReplyInput;
