import { ReactNode } from 'react';
import { CloseSVG } from '@/components/svg/CloseSVG';

const TagInSearch = ({
  children,
  onClick,
  onDelete,
}: {
  children: ReactNode;
  onClick: () => void;
  onDelete: () => void;
}) => {
  return (
    <div
      className='flex h-[45px] max-w-[221px] cursor-pointer items-center rounded-full bg-gray-25 px-4 text-gray-800 body-16'
      onClick={onClick}
    >
      <div className='w-full overflow-hidden text-ellipsis whitespace-nowrap'>
        {children}
      </div>
      <div
        className='ml-1 cursor-pointer [&>svg]:h-4 [&>svg]:w-4'
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <CloseSVG />
      </div>
    </div>
  );
};

export default TagInSearch;
