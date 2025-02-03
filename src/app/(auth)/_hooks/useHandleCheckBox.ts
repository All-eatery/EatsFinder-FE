import { useState } from 'react';

export const useHandleCheckBox = () => {
  const [isChecked, setIsChecked] = useState<number[]>([]);
  const checkHandler = (id: number) => {
    console.log(id);
    setIsChecked((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };
  const checkAllHandler = (ids: number[]) => {
    setIsChecked([...ids]);
  };
  return {
    isChecked,
    checkHandler,
    checkAllHandler,
  };
};
