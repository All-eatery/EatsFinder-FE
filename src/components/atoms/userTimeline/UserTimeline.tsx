import { SimplifiedData } from '@/types/authType';
import { CreatedAt, CreatedBy } from '../timeLine';
import Link from 'next/link';

type TimeLineProps = {
  timeline: SimplifiedData;
};
export const UserTimeline = ({ timeline }: TimeLineProps) => {
  return (
    <div className='flex items-center border-b-[1px] border-b-gray-50 px-5 pb-4 pt-5 lg:pb-[25px]'>
      <Link
        href={`/posts/${timeline.postId}`}
        className='flex w-full flex-col justify-between gap-3 sm:flex-row sm:items-center lg:justify-normal'
      >
        <div className='flex flex-col lg:flex-row lg:items-center lg:gap-3'>
          <div className='flex items-center gap-1 text-gray-500 body-16'>
            <CreatedBy
              profileUrl={timeline.postImageUrl}
              nickname={timeline.postUserNickname}
            />
            <p>{timeline.typeMessage}</p>
          </div>
          {timeline.content && (
            <p className='ml-10 max-w-[55%] truncate text-gray-800 subTitle-16 lg:ml-0 lg:subTitle-20'>
              {timeline.content}
            </p>
          )}
          {(timeline.type === 'commentLike' ||
            timeline.type === 'replyLikes') && (
            <p className='text-gray-500 body-16'>에 좋아요를 눌렀어요.</p>
          )}
        </div>
        <CreatedAt createdAt={timeline.createdAt} />
      </Link>
    </div>
  );
};
