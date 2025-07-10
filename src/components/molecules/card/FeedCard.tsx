import Image from 'next/image';
import { ProfileImage } from '@/components/atoms';
import { BookmarkButton } from '../../../app/(auth)/_components/BookmarkButton';

interface FeedCardProps {
  postId: number;
  placeName: string;
  postThumbnailUrl: string;
  isPostLike: boolean;
  postLikeCount: number;
  profileImage: string;
  nickname: string;
  handleClick?: () => void;
  handlePostLikeCick?: () => void;
}

export const FeedCard = ({ ...props }: FeedCardProps) => {
  return (
    <div className='flex w-[250px] flex-col gap-1' onClick={props.handleClick}>
      <div className='relative h-[350px] cursor-pointer overflow-hidden rounded-3xl'>
        <Image
          className='object-cover'
          src={props.postThumbnailUrl}
          fill={true}
          sizes='100%'
          alt={props.placeName}
        />
      </div>
      <div className='flex justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <ProfileImage size={40} />
          <div className='flex flex-col'>
            <span className='text-gray-500 subTitle-20'>{props.nickname}</span>
            <span className='text-gray-500 body-14'>{props.placeName}</span>
          </div>
        </div>
        <div className='flex w-9 flex-col items-center justify-center'>
          {/* <Checkbox variant='fav' /> */}
          <BookmarkButton placeId={8} isMarked={false} />
          <span className='text-gray-600 body-14'>{props.postLikeCount}</span>
        </div>
      </div>
    </div>
  );
};
