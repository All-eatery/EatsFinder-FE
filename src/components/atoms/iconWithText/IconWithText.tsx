import { ReactNode, ReactElement, MouseEventHandler } from 'react';

type IconWithTextProps = {
  gap?: number;
  icon: ReactElement;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
};

export const IconWithText = ({
  gap = 4,
  icon,
  children,
  onClick,
}: IconWithTextProps) => {
  return (
    <div className={`flex gap-${gap} items-center`}>
      <span onClick={onClick}>{icon}</span>
      <span className='text-gray-700 body-20'>{children}</span>
    </div>
  );
};
