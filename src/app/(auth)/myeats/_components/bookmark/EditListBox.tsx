import { Checkbox } from '@/components/atoms';
import React from 'react';

export const EditListBox = () => {
  return (
    <div
      className='flex w-[520px] items-center gap-3 rounded-3xl px-6 py-5'
      style={{
        boxShadow:
          '0 4px 10px rgba(0, 0, 0, 0.05), 0 -4px 10px rgba(45, 31, 31, 0.05), -4px 0 10px rgba(0, 0, 0, 0.05), 4px 0 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Checkbox variant='Checkbox_Ver2' />
      <div>
        <p className='text-gray-800 title-24'>기본리스트</p>
        <p className='text-gray-400 body-18'>4개의 게시물</p>
      </div>
    </div>
  );
};
