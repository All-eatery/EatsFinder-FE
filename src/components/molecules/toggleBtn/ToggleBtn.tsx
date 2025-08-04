import { ToggleBtn_Button } from '@/components/atoms/button/ToggleBtn_Button';
import { Dispatch, SetStateAction } from 'react';

type ToggleBtnProps<T> = {
  text_1: string;
  label_1: T;
  text_2: string;
  label_2: T;
  value: T;
  setState: Dispatch<SetStateAction<T>>;
  size?: 'small' | 'large';
};

export const ToggleBtn = <T extends string>({
  text_1,
  text_2,
  label_1,
  label_2,
  value,
  setState,
  size,
}: ToggleBtnProps<T>) => {
  const handleClick = (selected: T) => {
    setState(selected);
  };

  return (
    <div className='flex gap-[6px] rounded-3xl bg-slate-100 p-[2px] subTitle-12'>
      <ToggleBtn_Button
        size={'large'}
        onClick={() => handleClick(label_1)}
        active={value === label_1}
      >
        {text_1}
      </ToggleBtn_Button>
      <ToggleBtn_Button
        size={'large'}
        onClick={() => handleClick(label_2)}
        active={value === label_2}
      >
        {text_2}
      </ToggleBtn_Button>
    </div>
  );
};
