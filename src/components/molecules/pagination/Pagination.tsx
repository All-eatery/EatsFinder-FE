'use client';
import { PageNumberButton, PaginationButton } from '@/components/atoms';
import { PaginationType } from '@/types/authType';

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
  if (!pagination) return;

  return (
    <div className='flex justify-center'>
      <div className='flex gap-1'>
        <PaginationButton direction='prev' onClick={handlePrevButtonClick} />
        {Array.from({ length: pagination.totalPage }).map((_, i) => (
          <PageNumberButton
            number={i + 1}
            key={i}
            isActive={i === currentPage}
            onClick={() => handlePaginationClick(i)}
          />
        ))}
        <PaginationButton direction='next' onClick={handleNextButtonClick} />
      </div>
    </div>
  );
};
