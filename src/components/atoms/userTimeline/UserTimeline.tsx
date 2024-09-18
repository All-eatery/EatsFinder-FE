import { CreatedBy } from '../timeLine/CreatedBy';
import { CreatedAt } from '../timeLine/CreatedAt';
import { Active, SimplifiedData } from '@/types/authType';

type TimeLineProps = {
  timeline: SimplifiedData;
};
export const UserTimeline = ({ timeline }: TimeLineProps) => {
  return (
    <div className='flex w-[1368px] items-center border-b-[1px] border-b-gray-50 px-5 pb-[25px] pt-5'>
      <div className='flex w-full items-center gap-3'>
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
        {timeline.type === 'commentLike' && <p>에 좋아요를 눌렀어요.</p>}
        <CreatedAt createdAt={timeline.createdAt} />
      </div>
    </div>
  );
};
