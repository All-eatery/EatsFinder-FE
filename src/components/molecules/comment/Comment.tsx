import { ProfileImage } from '@/components/atoms';
import { ThumbsSVG } from '@/components/svg/ThumbsSVG';
import { CommentType } from '@/types/comment';
import { customTwMerge } from '@/utils/customTwMerge';
import timeDifference from '@/utils/timeDifference';

interface CommentProps {
  comment: CommentType;
  isLiked?: boolean;
  isAuthor?: boolean;
}

export const Comment = ({
  comment,
  isLiked = false,
  isAuthor = false,
}: CommentProps) => {
  return (
    <div
      className={customTwMerge(
        'flex rounded-3xl p-5',
        isAuthor && 'bg-gray-50',
      )}
    >
      <div className='mr-6 flex items-center'>
        <ProfileImage size={70} />
      </div>
      <div className='flex flex-col gap-3'>
        <div>
          <span className='mr-3 text-gray-600 subTitle-18'>
            {comment.nickname}
          </span>
          <span className='text-gray-300 body-16'>
            {timeDifference(comment.createdAt)}
          </span>
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
    </div>
  );
};
