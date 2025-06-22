import { Button } from '@/components/atoms';
import { FeedCard } from '@/components/molecules';
import { ToggleBtn } from '@/components/molecules/toggleBtn/ToggleBtn';
export const PlacePosts = ({ id }: { id: number }) => {
  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-end'>
          <ToggleBtn text_1='최신순' text_2='좋아요순' />
        </div>
        <div className='flex gap-2'>
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
      </div>
      <div className='flex justify-center py-[60px]'>
        <Button variant={'stroke'}>더보기</Button>
      </div>
    </>
  );
};
