'use client';
import { ToastErrorSVG } from '@/components/svg/ToastErrorSVG';
import { ToastSuccessSVG } from '@/components/svg/ToastSuccessSVG';
import { useToast } from '@/provider/contextProvider/ToastProvider';
import { customTwMerge } from '@/utils/customTwMerge';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import toastErrorImage from '../../../assets/images/toastError.png';
import toastSuccessImage from '../../../assets/images/toastSuccess.png';

const ToastVariants = cva(
  'rounded-lg px-5 py-4  transition-opacity body-18 text-gray-900 flex gap-2 h-16 justify-between hover:cursor-pointer',
  {
    variants: {
      type: {
        success: 'shadow-[0_0_12px_2px_#4592FB] ',
        error: 'shadow-[0_0_12px_2px_#E62900]',
      },
    },
  },
);
export const ToastMessageBox = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className='fixed right-4 top-4 z-50 space-y-4'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={customTwMerge(ToastVariants({ type: toast.type }))}
          onClick={() => removeToast(toast.id)}
        >
          <div className='flex items-center gap-2'>
            {toast.type === 'success' ? <ToastSuccessSVG /> : <ToastErrorSVG />}
            <span>{toast.message}</span>
          </div>
          <figure className='relative w-12'>
            <Image
              src={
                toast.type === 'success' ? toastSuccessImage : toastErrorImage
              }
              alt='토스트 이미지'
            />
          </figure>
        </div>
      ))}
    </div>
  );
};
