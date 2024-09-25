'use client';
import { ArrowSVG } from '@/components/svg/ArrowSVG';
import { useState } from 'react';
const PageNumber = ({
  number,
  isActive,
}: {
  number: number;
  isActive?: boolean;
}) => {
  return (
    <button
      className={`flex h-8 w-8 items-center justify-center rounded-2xl ${isActive ? 'bg-primary-400 text-white' : 'text-gray-700'}`}
    >
      {number}
    </button>
  );
};
type ButtonDirection = {
  direction: 'prev' | 'next';
};
const PageButton = ({ direction }: ButtonDirection) => {
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
    <button>
      <ArrowSVG direction={buttonDirection} color='orange' />
    </button>
  );
};
export const Pagination = () => {
  const arr = ['1', '2', '3', '4', '5', '6', ' 7'];
  const [pageNumber, setPageNumber] = useState('');
  return (
    <div className='flex gap-1'>
      <PageButton direction='prev' />
      {arr.map((_, i) => (
        <PageNumber number={i + 1} key={i} />
      ))}
      <PageNumber number={8} isActive={true} />
      <PageNumber number={9} />
      <PageButton direction='next' />
    </div>
  );
};
