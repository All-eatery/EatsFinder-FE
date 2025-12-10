import { SocialActionButton } from '@/app/(auth)/_components/SocialActionButton';
import { ProfileImage } from '@/components/atoms';
import { FeedCardProps } from '@/types/postType';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';

export const FeedCard = forwardRef<HTMLDivElement, FeedCardProps>(
  ({ id, isLiked, likeCount, nickname, profileImage, thumbnailUrl }, ref) => {
    return (
      <div ref={ref} className='relative flex w-full flex-col gap-1'>
        <Link href={`/posts/${id}`}>
          <figure className='relative h-[224px] overflow-hidden rounded-3xl md:h-[246px] lg:h-[269px] xl:h-[350px]'>
            <Image
              className='object-cover'
              src={thumbnailUrl}
              fill={true}
              alt='feed card'
            />
          </figure>
        </Link>
        <div className='flex justify-between'>
          <div className='flex items-center justify-center gap-2'>
            <figure className='hidden xl:block'>
              <ProfileImage size={40} src={profileImage} />
            </figure>
            <div className='flex flex-col'>
              <span className='text-gray-500 subTitle-20'>{nickname}</span>
              <span className='text-gray-500 body-14'>파스타 참 맛있는 집</span>
            </div>
          </div>
          <div className='flex w-9 flex-col items-center justify-center'>
            <div className='relative'>
              <SocialActionButton id={id} isConnected={isLiked} type='post' />
            </div>
            <span className='text-gray-600 body-14'>{likeCount}</span>
          </div>
        </div>
      </div>
    );
  },
);
FeedCard.displayName = 'FeedCard';
