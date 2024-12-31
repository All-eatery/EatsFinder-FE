import { RadioSVG } from '@/components/svg/RadioSVG';
import React from 'react';

interface RadioButtonProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export function RadioButton({ options, selected, onChange }: RadioButtonProps) {
  return (
    <div className='flex gap-6'>
      {options.map((option) => (
        <label key={option.value} className='flex cursor-pointer items-center'>
          <input
            type='radio'
            name='radio-group'
            value={option.value}
            checked={selected === option.value}
            onChange={() => onChange(option.value)}
            className='hidden'
          />
          <RadioSVG isChecked={selected === option.value} />
          <span className='ml-1 text-gray-700 subTitle-16'>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
