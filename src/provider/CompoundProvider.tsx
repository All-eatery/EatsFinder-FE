import { PropsWithChildren } from 'react';
import { TanstackQueryProvider } from './tanstackQueryProvider/TanstackQueryProvider';

export const CompoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </>
  );
};
