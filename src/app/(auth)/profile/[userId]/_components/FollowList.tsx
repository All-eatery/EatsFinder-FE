import Image from 'next/image';
import React from 'react';
import { FollowButton } from './FollowButton';
export const sampleImg =
  'https://lh3.googleusercontent.com/a/ACg8ocL5qL_KbAxVIQMCT7KSAb4JqtAcYMl9mGBwcdJhtPl9owCW1A=s96-c';
type FollowUserProps = {
  isLoggedIn: boolean;
  id: number;
  nickname: string;
  image: string;
  isFollowed: boolean;
};
export const FollowUser = ({
  isLoggedIn,
  id,
  nickname,
  image,
  isFollowed,
}: FollowUserProps) => {
  if (!image) {
    image = sampleImg;
  }
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <Image
          src={image}
          alt='프로필 이미지'
          width={70}
          height={70}
          className='aspect-square rounded-full object-cover'
        />
        <span className='text-gray-600 subTitle-18'>{nickname}</span>
      </div>
      <FollowButton id={id} isFollowed={isFollowed} isLoggedIn={isLoggedIn} />
    </div>
  );
};
