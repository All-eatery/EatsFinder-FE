'use client';
import { CloseSVG } from '@/components/svg/CloseSVG';

interface ModalHeaderProps {
  title: string;
  description?: string;
  onClose: () => void;
}

export const ModalHeader = ({
  title,
  description,
  onClose,
}: ModalHeaderProps) => {
  return (
    <header className='relative py-10'>
      <h2 className='mb-1 whitespace-pre text-center text-gray-800 title-34'>
        {title}
      </h2>
      <p className='text-center text-gray-300 body-16'>{description}</p>
      <button
        className='absolute left-10 top-10 h-6 w-6'
        onClick={onClose}
        aria-label='close modal'
      >
        <CloseSVG />
      </button>
    </header>
  );
};
