import { useState } from 'react';
export const useTimelineFilterState = (
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  const [TimelineFilter, setTimelineFilter] = useState('ALL');
  const handleFileterState = (value: string) => {
    setTimelineFilter(value);
    setPage(0);
  };
  return { TimelineFilter, handleFileterState };
};
