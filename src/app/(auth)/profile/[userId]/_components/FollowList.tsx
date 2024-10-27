import Image from 'next/image';
import React from 'react';
import { FollowButton } from './FollowButton';

type FollowUserProps = {
  id: number;
  nickname: string;
  image: string;
  isFollowed: boolean;
};
export const FollowUser = ({
  id,
  nickname,
  image,
  isFollowed,
}: FollowUserProps) => {
  if (!image) {
    image =
      'https://lh3.googleusercontent.com/a/ACg8ocL5qL_KbAxVIQMCT7KSAb4JqtAcYMl9mGBwcdJhtPl9owCW1A=s96-c';
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
      <FollowButton id={id} isFollowed={isFollowed} />
    </div>
  );
};
//팔로우 취소 텍스트가 들어가면 버튼 사이즈가 안맞아서 새로운 버튼 사용
const FollowBtn = () => {};
