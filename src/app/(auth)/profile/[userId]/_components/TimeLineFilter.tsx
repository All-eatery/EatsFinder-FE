import { Checkbox } from '@/components/atoms';
import { useState } from 'react';
type TimeLineFiletrProps = {
  handler: (value: string) => void;
};
export const TimeLineFilter = ({ handler }: TimeLineFiletrProps) => {
  return (
    <div className='flex gap-6'>
      <Checkbox
        label='댓글만'
        variant='Checkbox_Ver2'
        className='text-gray-700 subTitle-16'
        defaultChecked={true}
        onChange={() => handler('comment')}
      />
      <Checkbox
        label='좋아요만'
        variant='Checkbox_Ver2'
        className='text-gray-700 subTitle-16'
        defaultChecked={true}
        onChange={() => handler('like')}
      />
    </div>
  );
};
