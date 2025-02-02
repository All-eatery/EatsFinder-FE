'use client';
import { CardHoverMsg } from '@/components/atoms/cardHoverMsg';
import { MyfeedCardProps } from '@/types/authType';
import Image from 'next/image';
import { useState } from 'react';

export const MyFeedCard = ({ data, isOwnProfile }: MyfeedCardProps) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className='relative h-[408px] w-[250px]'
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Image
        className='rounded-3xl object-cover'
        src={data.thumbnailUrl}
        fill={true}
        alt='my feed card'
        priority={true}
        sizes='(max-width: 250px) 100vw, 250px'
      />
      {isHover && <CardHoverMsg data={data} isOwnProfile={isOwnProfile} />}
    </div>
  );
};
