import { PropsWithChildren } from 'react';
import { TanstackQueryProvider } from './tanstackQueryProvider/TanstackQueryProvider';
import { ToastProvider } from './contextProvider/ToastProvider';
import { ToastContainer } from '@/components/atoms/toastMessageBox/ToastMessageBox';

export const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TanstackQueryProvider>
        <ToastProvider>
          <ToastContainer />
          {children}
        </ToastProvider>
      </TanstackQueryProvider>
    </>
  );
};
