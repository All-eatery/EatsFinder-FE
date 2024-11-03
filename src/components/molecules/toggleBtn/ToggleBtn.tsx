import { ToggleBtn_Button } from '@/components/atoms/button/ToggleBtn_Button';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import React from 'react';

type ToggleBtnProps = {
  text_1: string;
  text_2: string;
};
export const ToggleBtn = ({ text_1, text_2 }: ToggleBtnProps) => {
  const { value, handleValue } = useToggleHandler();
  return (
    <div className='flex gap-[6px] rounded-3xl bg-slate-100 p-[2px] subTitle-12'>
      <ToggleBtn_Button onClick={handleValue} active={!value}>
        {text_1}
      </ToggleBtn_Button>
      <ToggleBtn_Button onClick={handleValue} active={value}>
        {text_2}
      </ToggleBtn_Button>
    </div>
  );
};
