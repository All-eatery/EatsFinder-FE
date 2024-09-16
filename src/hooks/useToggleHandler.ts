'use client';
import { useCallback, useState } from 'react';

export const useToggleHandler = (init = false) => {
  const [value, setValue] = useState<boolean>(init);
  const handleValue = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return { value, handleValue, setValue };
};
