import { customTwMerge } from '@/utils/customTwMerge';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { string } from 'zod';

const toggleVariants = cva(
  'flex h-6 w-[70px] items-center justify-center rounded-3xl',
  {
    variants: {
      active: {
        true: 'bg-white text-primary-400',
        false: 'text-gray-400',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);
interface ToggleBtn_ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {}
export const ToggleBtn_Button = ({
  active,
  className,
  ...props
}: ToggleBtn_ButtonProps) => {
  return (
    <button
      className={customTwMerge(toggleVariants({ active, className }))}
      {...props}
    />
  );
};
//     <div className='flex gap-[6px] rounded-3xl bg-slate-100 p-[2px] subTitle-12'>
//     {text_1}
//   <div className='flex h-6 w-[70px] items-center justify-center rounded-3xl text-gray-400'>
//     {text_2}
//   </div>
// </div>
