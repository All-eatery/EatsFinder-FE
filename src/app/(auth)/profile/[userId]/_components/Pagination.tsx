'use client';
import { ArrowSVG } from '@/components/svg/ArrowSVG';
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
export const Pagination = () => {
  const arrLeng = 7;
  console.log('됨?');
  const arr = new Array(arrLeng).fill(1);
  console.log(arr);
  const [pageNumber, setPageNumber] = useState(0);
  const handlePaginationClick = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };
  const handlePrevButtonClick = () => {
    if (pageNumber === 0) return;
    setPageNumber(pageNumber - 1);
  };
  const handleNextButtonClick = () => {
    console.log(pageNumber);
    if (pageNumber === arrLeng - 1) return;
    setPageNumber(pageNumber + 1);
  };
  return (
    <div className='flex gap-1'>
      <PageButton direction='prev' onClick={handlePrevButtonClick} />
      {Array.from({ length: arrLeng }).map((_, i) => (
        <PageNumberButton
          number={i + 1}
          key={i}
          isActive={i === pageNumber}
          onClick={() => handlePaginationClick(i)}
        />
      ))}

      <PageButton onClick={handleNextButtonClick} direction='next' />
    </div>
  );
};
