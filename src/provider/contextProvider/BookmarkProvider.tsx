import React, { createContext, useContext, useState } from 'react';

interface BookmarkContextType {
  totalItems: number;
  setTotalItems: (count: number) => void;
  listCount: number;
  setListCount: (count: number) => void;
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
  const [listCount, setListCount] = useState(0);
  const [listName, setListName] = useState('');
  return (
    <BookmarkContext.Provider
      value={{
        totalItems,
        setTotalItems,
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

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmark must be used within a BookmarkProvider');
  }
  return context;
};
