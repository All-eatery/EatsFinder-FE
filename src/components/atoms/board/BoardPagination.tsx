'use client';
import { customTwMerge } from '@/utils/customTwMerge';
import { cva } from 'class-variance-authority';

interface BoardPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const BoardPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: BoardPagination) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='flex justify-center'>
      {pages.map((page) => (
        <NoticesPaginationButton
          key={page}
          page={page}
          isSelected={page === currentPage}
          onClick={onPageChange}
        />
      ))}
    </div>
  );
};
interface NoticesPaginationButtonProps {
  page: number;
  isSelected: boolean;
  onClick: (page: number) => void;
}
const buttonVariants = cva(
  'px-3 py-1 cursor-pointer transition-colors duration-200 ease-in-out ',
  {
    variants: {
      isSelected: {
        true: 'text-gray-800 border-b-2 border-gray-800 subTitle-16',
        false: 'text-gray-300 hover:text-gray-500 body-16 ',
      },
    },
    defaultVariants: {
      isSelected: false,
    },
  },
);

const NoticesPaginationButton = ({
  page,
  isSelected,
  onClick,
}: NoticesPaginationButtonProps) => {
  return (
    <div
      onClick={() => onClick(page)}
      className={customTwMerge(buttonVariants({ isSelected }))}
    >
      {page}
    </div>
  );
};
