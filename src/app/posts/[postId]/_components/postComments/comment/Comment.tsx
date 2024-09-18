import { useDropdownHandler } from '@/hooks/useDropdownHandler';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { ProfileImage } from '@/components/atoms';
import { Modal } from '@/components/organisms';
import { DropdownMenu } from '@/components/molecules/dropdownMenu';
import { ThumbsSVG } from '@/components/svg/ThumbsSVG';
import { MoreSVG } from '@/components/svg/MoreSVG';
import { CommentType } from '@/types/comment';
import { customTwMerge } from '@/utils/customTwMerge';
import timeDifference from '@/utils/timeDifference';
import { getClientUserInfo } from '@/utils/getClientUserInfo';

interface CommentProps {
  comment: CommentType;
  isLiked?: boolean;
  handleDeleteComment: (commentId: number) => Promise<void>;
}

export const Comment = ({
  comment,
  isLiked = false,
  handleDeleteComment,
}: CommentProps) => {
  const userInfo = getClientUserInfo();
  const { isDropdownOpen, dropdownHanlder, dropdownRef } = useDropdownHandler();
  const { value: isOpenDeleteModal, handleValue: handleOpenDeleteModal } =
    useToggleHandler();

  const dropdownItems = [
    ...(userInfo.nickname === comment.nickname
      ? [
          {
            label: '수정하기',
            onClick: () => {},
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
  return (
    <div
      className={customTwMerge(
        'mb-6 flex rounded-3xl p-5',
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
        <p className='break-normal text-gray-600 body-20'>{comment.content}</p>
        <div className='flex items-center gap-2'>
          <div
            className={customTwMerge(
              '[&>svg]:h-[18px] [&>svg]:w-[18px]',
              isLiked ? 'fill-primary-400' : 'fill-gray-400',
            )}
          >
            <ThumbsSVG />
          </div>
          <span className='text-gray-300 body-16'>{comment.likeCount}</span>
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
  );
};
