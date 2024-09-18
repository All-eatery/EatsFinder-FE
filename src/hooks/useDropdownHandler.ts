'use client';
import { useEffect, useRef } from 'react';
import { useToggleHandler } from './useToggleHandler';

export const useDropdownHandler = () => {
  const {
    value: isDropdownOpen,
    setValue: setIsDropdownOpen,
    handleValue: dropdownHanlder,
  } = useToggleHandler();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, setIsDropdownOpen]);
  return { isDropdownOpen, dropdownHanlder, dropdownRef };
};
