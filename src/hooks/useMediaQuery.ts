import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  {
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const media = window.matchMedia(query);
        const listner = () => setMatches(media.matches);
        listner();
        media.addEventListener('change', listner);
        return () => media.removeEventListener('change', listner);
      }
    }, [query]);
    return matches;
  }
};
