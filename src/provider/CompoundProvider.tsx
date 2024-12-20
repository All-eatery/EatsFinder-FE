import { PropsWithChildren } from 'react';
import { TanstackQueryProvider } from './tanstackQueryProvider/TanstackQueryProvider';
import { ToastProvider } from './contextProvider/ToastProvider';
import { ToastMessageBox } from '@/components/atoms/toastMessageBox/ToastMessageBox';

export const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TanstackQueryProvider>
        <ToastProvider>
          <ToastMessageBox />
          {children}
        </ToastProvider>
      </TanstackQueryProvider>
    </>
  );
};
