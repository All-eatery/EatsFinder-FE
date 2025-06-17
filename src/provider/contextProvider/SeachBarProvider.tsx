'use client';

import { useSearchbarHandler } from '@/hooks/useSearchbarHandler';
import { ChangeEvent, createContext, ReactNode, useContext } from 'react';

type SearcBarProviderType = {
  inputText: string;
  searchText: string;
  searchbarHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  resetSearchText: () => void;
};

const SearchBarContext = createContext<SearcBarProviderType | null>(null);
export const SearchBarProvider = ({ children }: { children: ReactNode }) => {
  const searchbarState = useSearchbarHandler();
  return (
    <SearchBarContext.Provider value={searchbarState}>
      {children}
    </SearchBarContext.Provider>
  );
};
export const useSearchbarContext = () => {
  const context = useContext(SearchBarContext);
  if (!context)
    throw new Error(
      'useSearchbarContext must be used within SearchbarProvider',
    );
  return context;
};
