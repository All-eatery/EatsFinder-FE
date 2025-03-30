'use clietn';

import { ChangeEvent, useState } from 'react';

export const useSearchbarHandler = <U>(
  searchFunction: (params: string) => Promise<U>,
) => {
  const [searchText, setSearchText] = useState('');
  const searchbarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearch = async () => {
    if (!searchText.trim()) return;
    const data = await searchFunction(searchText);
    return data;
  };
  return { searchText, searchbarHandler, handleSearch };
};
