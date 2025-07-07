import { ReactNode } from 'react';
import { Portal } from '@/components/atoms';
import { ModalHeader, ModalFooter } from '@/components/molecules';
import { cva, type VariantProps } from 'class-variance-authority';

const modalVariant = cva('bg-white rounded-3xl', {
  variants: {
    size: {
      large: 'w-[764px]',
      medium: 'w-[600px]',
    },
  },
  defaultVariants: {
    size: 'large',
  },
});

interface ModalProps extends VariantProps<typeof modalVariant> {
  title: string;
  description?: string;
  mainButton: string;
  subButton?: string;
  isOpen: boolean;
  onClose: () => void;
  onMainClick: () => void;
  onSubClick?: () => void;
  children?: ReactNode;
}

export const Modal = ({
  title,
  description,
  mainButton,
  subButton,
  isOpen,
  size,
  onClose,
  onMainClick,
  onSubClick,
  children,
}: ModalProps) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50'
            aria-modal={true}
            onClick={(e) => e.stopPropagation()}
          >
            <article className={modalVariant({ size })}>
              <ModalHeader
                title={title}
                description={description}
                onClose={onClose}
              />
              {children}
              <ModalFooter
                mainButton={mainButton}
                subButton={subButton}
                onMainClick={onMainClick}
                onSubClick={onSubClick}
              />
            </article>
          </div>
        </Portal>
      )}
    </>
  );
};
