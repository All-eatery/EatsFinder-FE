'use client';
import { SocialActionButton } from '@/app/(auth)/_components/SocialActionButton';
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
  return (
    <div
      className='relative h-[408px] w-[250px] overflow-hidden rounded-3xl'
      onClick={() => console.log(id)}
    >
      <Image fill alt='게시글 이미지' src={src} />
      <SocialActionButton id={id} isConnected={isLiked} type='post' />
      <div className='absolute bottom-5 left-5 z-10 flex items-center gap-2'>
        <ProfileImage src={profileImage} size={60} />
        <span className='text-white subTitle-20'>{nickname}</span>
      </div>
    </div>
  );
};
