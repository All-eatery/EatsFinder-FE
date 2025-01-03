import { AddSVG } from '@/components/svg/AddSVG';
import Link from 'next/link';
import React from 'react';

export const PostingButton = () => {
  return (
    <div className='fixed bottom-5 right-5 z-30'>
      <Link
        href='/post/new'
        className='flex h-20 w-20 items-center justify-center rounded-full bg-primary-400'
      >
        <AddSVG isUsable={false} width={45} height={45} />
      </Link>
    </div>
  );
};
