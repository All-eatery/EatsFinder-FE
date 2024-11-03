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
      <div className='relative flex h-[70px] w-[70px] items-center'>
        <Image
          className='rounded-full'
          src={url}
          fill={true}
          alt='user profile'
        />
      </div>
      <p className='text-gray-600 subTitle-18'>{nickname}</p>
    </div>
  );
};
