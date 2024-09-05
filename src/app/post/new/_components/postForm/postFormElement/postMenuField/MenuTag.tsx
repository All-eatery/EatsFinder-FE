import { ReactNode } from 'react';
import { CloseSVG } from '@/components/svg/CloseSVG';

export const MenuTag = ({
  children,
  closeIcon,
  onClick,
}: {
  children: ReactNode;
  closeIcon?: boolean;
  onClick: () => void;
}) => {
  return (
    <span
      className='inline-flex h-[45px] cursor-pointer items-center justify-center gap-1 rounded-3xl bg-gray-50 px-5 text-gray-800 body-16 hover:bg-gray-75 [&>svg]:h-4 [&>svg]:w-4'
      onClick={onClick}
    >
      <span>{children}</span>
      {closeIcon && <CloseSVG />}
    </span>
  );
};
