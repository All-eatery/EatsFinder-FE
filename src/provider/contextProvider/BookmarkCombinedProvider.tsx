'use client';

import { ReactNode } from 'react';
import { BookmarkCheckProvider } from './BookmarkCheckProvider';
import { SearchBarProvider } from './SeachBarProvider';

type CombinedProviderProps = {
  children: ReactNode;
};

export const BookmarkCombinedProvider = ({
  children,
}: CombinedProviderProps) => {
  return (
    <BookmarkCheckProvider>
      <SearchBarProvider>{children}</SearchBarProvider>
    </BookmarkCheckProvider>
  );
};
