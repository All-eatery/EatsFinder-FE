import { Checkbox } from '@/components/atoms';
import { RadioButton } from '@/components/atoms/radioButton';
import { useState } from 'react';
type TimeLineFiletrProps = {
  handler: (value: string) => void;
};
export const TimeLineFilter = ({ handler }: TimeLineFiletrProps) => {
  const [selected, setSelected] = useState('ALL');
  const handleTimeLineRadioButton = (value: string) => {
    setSelected(value);
    handler(value);
  };
  return (
    <div className='flex gap-6'>
      <RadioButton
        options={[
          { value: 'ALL', label: '전체보기' },
          { value: 'COMMENT', label: '댓글만' },
          { value: 'LIKE', label: '좋아요만' },
        ]}
        selected={selected}
        onChange={(value) => handleTimeLineRadioButton(value)}
      />
    </div>
  );
};
