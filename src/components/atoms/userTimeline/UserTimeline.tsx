import { SimplifiedData } from '@/types/authType';
import { CreatedAt, CreatedBy } from '../timeLine';
import Link from 'next/link';

type TimeLineProps = {
  timeline: SimplifiedData;
};
export const UserTimeline = ({ timeline }: TimeLineProps) => {
  return (
    <div className='flex w-[1368px] items-center border-b-[1px] border-b-gray-50 px-5 pb-[25px] pt-5'>
      <Link
        href={`/posts/${timeline.postId}`}
        className='flex w-full items-center gap-3'
      >
        <div className='flex items-center gap-1 text-gray-500 body-16'>
          <CreatedBy
            profileUrl={timeline.postImageUrl}
            nickname={timeline.postUserNickname}
          />
          <p>{timeline.typeMessage}</p>
        </div>
        {timeline.content && (
          <p className='max-w-[55%] truncate text-gray-800 subTitle-20'>
            {timeline.content}
          </p>
        )}
        {(timeline.type === 'commentLike' ||
          timeline.type === 'replyLikes') && (
          <p className='text-gray-500 body-16'>에 좋아요를 눌렀어요.</p>
        )}
        <CreatedAt createdAt={timeline.createdAt} />
      </Link>
    </div>
  );
};
