'use client';
import { useCallback, useState } from 'react';

export const useToggleHandler = () => {
  const [value, setValue] = useState<boolean>(false);
  const handleValue = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return { value, handleValue, setValue };
};
