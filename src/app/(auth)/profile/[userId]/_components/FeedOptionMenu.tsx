'use client';
import { OptionButton } from '@/components/atoms/button/OptionButton';
import React, { MouseEvent } from 'react';

export const FeedOptionMenu = ({ openModal }: { openModal: () => void }) => {
  const handler = () => {
    console.log('hi');
    openModal();
  };
  return (
    <div className='absolute right-0 top-0 z-20 flex w-40 flex-col overflow-hidden rounded-3xl bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]'>
      <OptionButton>수정하기</OptionButton>
      <OptionButton onClick={openModal}>삭제하기</OptionButton>
    </div>
  );
};
