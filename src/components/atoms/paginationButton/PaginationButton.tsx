import { ArrowSVG } from '@/components/svg/ArrowSVG';
import { ComponentProps } from 'react';

interface ButtonDirection extends ComponentProps<'button'> {
  direction: 'prev' | 'next';
}
export const PaginationButton = ({ direction, ...props }: ButtonDirection) => {
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
