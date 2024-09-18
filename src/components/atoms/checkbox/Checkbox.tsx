import React, { InputHTMLAttributes, forwardRef } from 'react';

import { customTwMerge } from '@/utils/customTwMerge';
import { BookmarkSVG } from '@/components/svg/BookmarkSVG';
import { FavSVG } from '@/components/svg/FavSVG';
import { CheckBoXSVG_Ver2, CheckBoxSVG } from '@/components/svg/CheckBoxSVG';

const icon = {
  checkbox: [
    CheckBoxSVG({ isChecked: 'check' }),
    CheckBoxSVG({ isChecked: 'blank' }),
  ],
  Checkbox_Ver2: [
    CheckBoXSVG_Ver2({ isChecked: 'check' }),
    CheckBoXSVG_Ver2({ isChecked: 'blank' }),
  ],
  bookmark: [BookmarkSVG({ isFill: true }), BookmarkSVG({ isFill: false })],
  fav: [FavSVG({ isFill: true }), FavSVG({ isFill: false })],
};

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  variant?: keyof typeof icon;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  function checkbox({ variant = 'checkbox', label, className, ...props }, ref) {
    return (
      <>
        <label className={customTwMerge('text-gray-700 body-14', className)}>
          <input
            ref={ref}
            className='peer visually-hidden'
            type='checkbox'
            {...props}
          />
          <span className='flex cursor-pointer items-center rounded-md peer-focus-visible:outline peer-focus-visible:outline-2 [&>svg:first-child]:hidden peer-checked:[&>svg:first-child]:block peer-checked:[&>svg:last-of-type]:hidden'>
            {icon[variant].map((it, idx) => (
              <React.Fragment key={idx}>{it}</React.Fragment>
            ))}
            <span className={customTwMerge('ml-1', label || 'visually-hidden')}>
              {label || variant}
            </span>
          </span>
        </label>
      </>
    );
  },
);
