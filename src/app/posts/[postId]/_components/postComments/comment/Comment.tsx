import { useState, useCallback } from 'react';
import { useDropdownHandler } from '@/hooks/useDropdownHandler';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { ProfileImage, Button } from '@/components/atoms';
import { TextField } from '@/components/atoms/textField';
import { Modal } from '@/components/organisms';
import { DropdownMenu } from '@/components/molecules/dropdownMenu';
import { ThumbsSVG } from '@/components/svg/ThumbsSVG';
import { MoreSVG } from '@/components/svg/MoreSVG';
import { DropSVG } from '@/components/svg/DropSVG';
import { CommentType } from '@/types/comment';
import { customTwMerge } from '@/utils/customTwMerge';
import timeDifference from '@/utils/timeDifference';
import { UserData } from '@/types/authType';

interface CommentProps {
  userInfo?: UserData;
  comment: CommentType;
  isReply?: boolean;
  handleDeleteComment: (commentId: number) => Promise<void>;
  handleEditComment: (commentId: number, content: string) => Promise<void>;
  handleToggleCommentLike: (
    commentId: number,
    isLiked: boolean,
  ) => Promise<void>;
}

export const Comment = ({
  userInfo,
  comment,
  isReply = false,
  handleDeleteComment,
  handleEditComment,
  handleToggleCommentLike,
}: CommentProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  const { isDropdownOpen, dropdownHanlder, dropdownRef } = useDropdownHandler();
  const { value: isOpenDeleteModal, handleValue: handleOpenDeleteModal } =
    useToggleHandler();

  const dropdownItems = [
    ...(userInfo?.nickname === comment.nickname
      ? [
          {
            label: '수정하기',
            onClick: () => {
              setIsEditMode(true);
              dropdownHanlder();
            },
          },
          {
            label: '삭제하기',
            onClick: () => {
              handleOpenDeleteModal();
              dropdownHanlder();
            },
          },
        ]
      : [{ label: '신고하기', onClick: () => {} }]),
  ];

  const callbackRef = useCallback((current: HTMLInputElement) => {
    current?.focus();
  }, []);

  return (
    <div>
      <div
        className={customTwMerge(
          'flex rounded-3xl p-5',
          comment.isMyComment && 'bg-gray-50',
        )}
      >
        <div className='mr-6 flex items-center'>
          <ProfileImage size={70} />
        </div>
        <div className='flex flex-grow flex-col gap-3'>
          <div className='flex items-center'>
            <span className='mr-3 text-gray-600 subTitle-18'>
              {comment.nickname}
            </span>
            <span className='text-gray-300 body-16'>
              {timeDifference(comment.createdAt)}
            </span>
            <div className='relative ml-auto self-end' ref={dropdownRef}>
              <button onClick={dropdownHanlder}>
                <MoreSVG />
              </button>
              {isDropdownOpen && (
                <DropdownMenu
                  className='w-[150px]'
                  dropdownItems={dropdownItems}
                />
              )}
            </div>
          </div>
          {isEditMode ? (
            <form>
              <TextField
                className='bg-transparent'
                ref={callbackRef}
                fullWidth={true}
                underStoke={true}
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
                button={
                  <Button
                    type='submit'
                    size='mini'
                    onClick={() => {
                      handleEditComment(comment.id, editedComment);
                      setIsEditMode(false);
                    }}
                  >
                    완료
                  </Button>
                }
              ></TextField>
            </form>
          ) : (
            <p className='break-normal text-gray-600 body-20'>
              {comment.content}
            </p>
          )}
          <div className='flex flex-col gap-6'>
            <div className='flex gap-6 text-gray-300 body-16'>
              <div className='flex items-center gap-2'>
                <div
                  className={customTwMerge(
                    'cursor-pointer [&>svg]:h-[18px] [&>svg]:w-[18px]',
                    comment.likeStatus ? 'fill-primary-400' : 'fill-gray-400',
                  )}
                  onClick={() => {
                    handleToggleCommentLike(comment.id, comment.likeStatus);
                  }}
                >
                  <ThumbsSVG />
                </div>
                <span>{comment.likeCount}</span>
              </div>
              {!isReply && <div className='cursor-pointer'>댓글</div>}
            </div>
            {!isReply && comment.replyList && (
              <div
                className='flex cursor-pointer items-center text-gray-600 body-20'
                onClick={() => setShowReply((prev) => !prev)}
              >
                댓글 {comment.replyList.length}개
                <DropSVG isUp={showReply} />
              </div>
            )}
          </div>
        </div>
        <Modal
          isOpen={isOpenDeleteModal}
          size='medium'
          title='댓글 삭제'
          mainButton='삭제'
          onMainClick={() => handleDeleteComment(comment.id)}
          onClose={handleOpenDeleteModal}
        >
          <p className='text-center'>이 댓글을 삭제할까요?</p>
        </Modal>
      </div>
      <div className='pl-16'>
        {showReply &&
          comment.replyList &&
          comment.replyList.map((d) => {
            console.log(d);
            return (
              <Comment
                key={d.id}
                comment={d}
                isReply={true}
                handleEditComment={handleEditComment}
                handleDeleteComment={handleDeleteComment}
                handleToggleCommentLike={handleToggleCommentLike}
              />
            );
          })}
      </div>
    </div>
  );
};
