import { customTwMerge } from '@/utils/customTwMerge';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

const toggleVariants = cva('flex items-center justify-center rounded-3xl', {
  variants: {
    active: {
      true: 'bg-white text-primary-400',
      false: 'text-gray-400',
    },
    size: {
      small: 'h-6 w-[70px]',
      large: 'h-8 xl:h-12 w-24 xl:w-36',
    },
  },
  defaultVariants: {
    active: false,
    size: 'small',
  },
});
interface ToggleBtn_ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {}
export const ToggleBtn_Button = ({
  active,
  size,
  className,
  ...props
}: ToggleBtn_ButtonProps) => {
  return (
    <button
      className={customTwMerge(toggleVariants({ active, size, className }))}
      {...props}
    />
  );
};
