import { useState } from 'react';
const initailValue = ['COMMENT', 'LIKE'];
export const useTimelineFilterState = (
  setPage: React.Dispatch<React.SetStateAction<number>>,
) => {
  const [TimelineFilter, setTimelineFilter] = useState(initailValue);
  const handleFileterState = (value: string) => {
    setTimelineFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
    setPage(0);
  };
  return { TimelineFilter, handleFileterState };
};
