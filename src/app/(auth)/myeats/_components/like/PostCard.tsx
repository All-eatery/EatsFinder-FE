'use client';
import { Checkbox, ProfileImage } from '@/components/atoms';
import Image from 'next/image';
import React, { useState } from 'react';
interface PostCardProps {
  id: number;
  src: string;
  profileImage?: string;
  nickname: string;
  isLiked: boolean;
}
export const PostCard = ({
  src,
  profileImage,
  nickname,
  isLiked,
  id,
}: PostCardProps) => {
  const [isChecked, setIsChecked] = useState(isLiked);
  const handleLike = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='relative h-[408px] w-[250px] overflow-hidden rounded-3xl'>
      <Image fill alt='게시글 이미지' src={src} />
      <Checkbox
        variant='fav'
        className='absolute right-5 top-5 z-10'
        onChange={handleLike}
        isChecked={isChecked}
      />
      <div className='absolute bottom-5 left-5 z-10 flex items-center gap-2'>
        <ProfileImage src={profileImage} size={60} />
        <span className='text-white subTitle-20'>{nickname}</span>
      </div>
    </div>
  );
};
