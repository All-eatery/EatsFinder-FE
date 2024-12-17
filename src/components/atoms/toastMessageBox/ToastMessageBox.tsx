'use client';
import { useToast } from '@/provider/contextProvider/ToastProvider';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className='fixed right-4 top-4 z-50 space-y-4'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className='rounded bg-gray-800 px-4 py-2 text-white shadow-md transition-opacity'
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
