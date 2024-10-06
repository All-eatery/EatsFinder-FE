import { useRef, useEffect, useCallback } from 'react';

const useInfiniteScroll = (callback: () => void) => {
  const obRef = useRef<HTMLElement>();

  useEffect(() => {
    if (obRef.current) {
      const ob = new IntersectionObserver((entries) => {
        console.log(entries);
        callback();
      });
      ob.observe(obRef.current);

      return () => {
        ob.disconnect();
      };
    }
  }, [callback]);

  const callbackRef = useCallback((current: HTMLDivElement) => {
    obRef.current = current;
  }, []);

  return callbackRef;
};

export default useInfiniteScroll;
