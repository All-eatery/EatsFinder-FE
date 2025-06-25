'use client';

import { useHandleCheckBox } from '@/app/(auth)/_hooks/useHandleCheckBox';
import React, { createContext, useContext, ReactNode } from 'react';

type BookmarkCheckContextType = ReturnType<typeof useHandleCheckBox>;

const BookmarkCheckContext = createContext<BookmarkCheckContextType | null>(
  null,
);

type BookmarkCheckProviderProps = {
  children: ReactNode;
};

export const BookmarkCheckProvider = ({
  children,
}: BookmarkCheckProviderProps) => {
  const checkBoxState = useHandleCheckBox();

  return (
    <BookmarkCheckContext.Provider value={checkBoxState}>
      {children}
    </BookmarkCheckContext.Provider>
  );
};

export const useBookmarkCheckContext = () => {
  const context = useContext(BookmarkCheckContext);
  if (!context) {
    throw new Error(
      'useBookmarkCheckContext must be used within a CheckBoxProvider',
    );
  }
  return context;
};
