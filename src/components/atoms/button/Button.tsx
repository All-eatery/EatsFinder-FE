import { ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { customTwMerge } from '@/utils/customTwMerge';

const buttonVariants = cva(
  'flex justify-center items-center h-[60px] p-[10px] rounded-[16px] subTitle-18',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-400 text-white hover:bg-primary-200 active:bg-primary-500 disabled:bg-primary-50 disabled:text-primary-200',
        stroke:
          'border border-primary-400 text-primary-400 hover:bg-primary-25 active:bg-primary-500 active:text-white',
        grayStroke: 'border border-gray-300 text-gray-300',
        gray: 'bg-gray-100 text-gray-300',
        error: 'bg-error text-white',
        dash: 'border border-dashed border-gary-100 bg-white text-gray-900 hover:bg-primary-25 active:bg-primary-500 active:text-white disabled:bg-gray-50 disabled:text-gray-100',
      },
      size: {
        mini: 'min-w-[80px] max-w-[140px] h-[35px] rounded-[20px] body-14',
        small: 'w-[160px]',
        medium: 'w-[280px]',
        large: 'w-[370px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  variant,
  size,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={customTwMerge(buttonVariants({ variant, size, className }))}
      disabled={variant === 'gray' ? true : disabled}
      {...props}
    />
  );
};
