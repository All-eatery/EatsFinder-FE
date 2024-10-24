'use client';
import { ArrowSVG } from '@/components/svg/ArrowSVG';
import { PaginationType } from '@/types/authType';
import { ComponentProps, useState } from 'react';
interface PageNumberButtonProps extends ComponentProps<'button'> {
  number: number;
  isActive?: boolean;
}
const PageNumberButton = ({
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
interface ButtonDirection extends ComponentProps<'button'> {
  direction: 'prev' | 'next';
}
const PageButton = ({ direction, ...props }: ButtonDirection) => {
  const buttonDirection = (() => {
    switch (direction) {
      case 'prev':
        return 'left';
      case 'next':
        return 'right';
      default:
        return 'down';
    }
  })();
  return (
    <button {...props}>
      <ArrowSVG direction={buttonDirection} color='orange' />
    </button>
  );
};

interface PaginationProps {
  pagination: PaginationType;
  setPage: (page: number) => void;
  currentPage: number;
}

export const Pagination = ({
  pagination,
  setPage,
  currentPage,
}: PaginationProps) => {
  const handlePaginationClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handlePrevButtonClick = () => {
    if (currentPage === 0) return;
    setPage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    if (currentPage === pagination.totalPage - 1) return;
    setPage(currentPage + 1);
  };

  return (
    <div className='flex justify-center'>
      <div className='flex gap-1'>
        <PageButton direction='prev' onClick={handlePrevButtonClick} />
        {Array.from({ length: pagination.totalPage }).map((_, i) => (
          <PageNumberButton
            number={i + 1}
            key={i}
            isActive={i === currentPage}
            onClick={() => handlePaginationClick(i)}
          />
        ))}
        <PageButton direction='next' onClick={handleNextButtonClick} />
      </div>
    </div>
  );
};
