'use client';
import { useToast } from '@/provider/contextProvider/ToastProvider';
import { customTwMerge } from '@/utils/customTwMerge';
import { VariantProps, cva } from 'class-variance-authority';

const ToastVariants = cva('rounded px-4 py-2 shadow-md transition-opacity ', {
  variants: {
    type: {
      success: ' bg-primary-400 text-white',
      error: ' bg-black text-white',
    },
  },
  defaultVariants: {
    type: 'success',
  },
});
interface ToastMessageBoxProps extends VariantProps<typeof ToastVariants> {}
export const ToastMessageBox = ({ type }: ToastMessageBoxProps) => {
  const { toasts, removeToast } = useToast();

  return (
    <div className='fixed right-4 top-4 z-50 space-y-4'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={customTwMerge(ToastVariants({ type }))}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
