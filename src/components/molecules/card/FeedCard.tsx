import Image from 'next/image';
import { Checkbox, ProfileImage } from '@/components/atoms';
import { BookmarkButton } from '../bookmarkButton/BookmarkButton';

interface FeedCardProps {
  onClick?: () => void;
}

export const FeedCard = ({ onClick }: FeedCardProps) => {
  return (
    <div className='flex w-[250px] flex-col gap-1' onClick={onClick}>
      <div className='relative h-[350px] overflow-hidden rounded-3xl'>
        <Image
          className='object-cover'
          src='https://images.unsplash.com/photo-1719861032503-225fac307c59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8'
          fill={true}
          alt='feed card'
        />
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <ProfileImage size={40} />
          <div className='flex flex-col'>
            <span className='text-gray-500 subTitle-20'>betty_eat</span>
            <span className='text-gray-500 body-14'>파스타 참 맛있는 집</span>
          </div>
        </div>
        <div className='flex w-9 flex-col items-center justify-center'>
          {/* <Checkbox variant='fav' /> */}
          <BookmarkButton placeId={8} />
          <span className='text-gray-600 body-14'>2400</span>
        </div>
      </div>
    </div>
  );
};
