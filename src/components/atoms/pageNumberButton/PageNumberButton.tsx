import { ComponentProps } from 'react';

interface PageNumberButtonProps extends ComponentProps<'button'> {
  number: number;
  isActive?: boolean;
}
export const PageNumberButton = ({
  number,
  isActive,
  ...props
}: PageNumberButtonProps) => {
  return (
    <button
      className={`flex h-8 w-8 items-center justify-center rounded-2xl ${isActive ? 'bg-primary-400 text-white' : 'text-gray-700'}`}
      {...props}
    >
      {number}
    </button>
  );
};
