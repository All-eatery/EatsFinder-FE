'use client';

import { ChangeEvent, useState } from 'react';
import { useToast } from '@/provider/contextProvider/ToastProvider';

export const useSearchbarHandler = () => {
  const { showToast } = useToast();

  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');

  const searchbarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      showToast('검색어를 입력해주세요.', 'error');
      return;
    }
    setSearchText(trimmed);
  };

  return {
    inputText,
    searchbarHandler,
    handleSearch,
    searchText,
  };
};
