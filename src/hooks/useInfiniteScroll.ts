import { useRef, useEffect, useCallback } from 'react';

const useInfiniteScroll = (callback: () => void) => {
  const obRef = useRef<HTMLDivElement>();
  const obCallbackRef = useCallback((element: HTMLDivElement) => {
    obRef.current = element;
  }, []);
  const memoizedCallback = useCallback(callback, []);

  useEffect(() => {
    console.log(obRef);
    if (obRef.current) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            memoizedCallback();
          }
        },
        { threshold: 0.5 },
      );
      io.observe(obRef.current);

      return () => {
        io.disconnect();
      };
    }
  }, [memoizedCallback]);

  return obCallbackRef;
};

export default useInfiniteScroll;
