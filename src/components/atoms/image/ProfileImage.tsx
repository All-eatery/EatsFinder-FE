'use client';

import Image from 'next/image';
import { customTwMerge } from '@/utils/customTwMerge';
import { DefaultIconSVG } from '@/components/svg/DefaultIconSVG';
import { useState } from 'react';

interface ProfileImageProps {
  src?: string | null;
  size: 20 | 40 | 50 | 60 | 70 | 100;
}

const profileImageSize = {
  20: 'h-5 w-5',
  40: 'h-[40px] w-[40px]',
  50: 'h-[50px] w-[50px]',
  60: 'h-[60px] w-[60px]',
  70: 'h-[70px] w-[70px]',
  100: 'h-[100px] w-[100px]',
};

export const ProfileImage = ({ src, size }: ProfileImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(null);
  };
  if (imgSrc)
    return (
      <Image
        className='aspect-square rounded-full object-cover'
        src={imgSrc}
        width={size}
        height={size}
        alt='profile image'
        onError={handleError}
      />
    );

  return (
    <div
      className={customTwMerge(
        `rounded-full [&>svg]:h-full [&>svg]:w-full`,
        profileImageSize[size],
      )}
    >
      {DefaultIconSVG()}
    </div>
  );
};
