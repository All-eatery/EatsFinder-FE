import { Button } from '@/components/atoms';
import Image from 'next/image';
import React from 'react';

type FollowUserProps = {
  nickname: string;
  image: string;
  followListBtn: '팔로잉 취소' | '팔로우';
};
export const FollowUser = ({
  nickname,
  image,
  followListBtn,
}: FollowUserProps) => {
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
      <Button size='mini'>{followListBtn}</Button>
    </div>
  );
};
