import { sampleImg } from '@/app/(auth)/profile/[userId]/_components/FollowList';
import Image from 'next/image';
type CreatedBy = {
  profileUrl: string;
  nickname: string;
};
export const CreatedBy = ({ nickname, profileUrl }: CreatedBy) => {
  const url = profileUrl ? profileUrl : sampleImg;
  return (
    <div className='flex items-center gap-3'>
      <div className='relative flex h-7 w-7 items-center lg:h-[70px] lg:w-[70px]'>
        <Image
          className='rounded-full'
          src={url}
          fill={true}
          alt='user profile'
        />
      </div>
      <p className='whitespace-nowrap text-gray-600 subTitle-16 lg:subTitle-18'>
        {nickname}
      </p>
    </div>
  );
};
