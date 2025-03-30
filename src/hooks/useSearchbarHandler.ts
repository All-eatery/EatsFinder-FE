'use clietn';

import { ChangeEvent, useState } from 'react';

export const useSearchbarHandler = () => {
  const [searchText, setSearchText] = useState('');
  const searchbarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearch = () => {
    if (!searchText.trim()) return;
    console.log('검색', searchText);
  };
  return { searchText, searchbarHandler, handleSearch };
};
