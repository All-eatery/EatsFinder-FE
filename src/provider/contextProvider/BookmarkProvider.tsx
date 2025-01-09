'use client';
import React, { createContext, useContext, useState } from 'react';

interface BookmarkContextType {
  totalItems: number;
  setTotalItems: (count: number) => void;
  listCount: number;
  setListCount: (count: number) => void;
  totalLists: number;
  setTotalLists: (count: number) => void;
  listName: string;
  setListName: (name: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

export const BookmarkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [totalItems, setTotalItems] = useState(0);
  const [totalLists, setTotalLists] = useState(0);
  const [listCount, setListCount] = useState(0);
  const [listName, setListName] = useState('');
  return (
    <BookmarkContext.Provider
      value={{
        totalItems,
        setTotalItems,
        totalLists,
        setTotalLists,
        listCount,
        setListCount,
        listName,
        setListName,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error(
      'useBookmarkContext must be used within a BookmarkProvider',
    );
  }
  return context;
};
