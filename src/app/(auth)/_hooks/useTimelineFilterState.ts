import { useState } from 'react';
const initailValue = ['comment', 'like'];
export const useTimelineFilterState = () => {
  const [TimelineFilter, setTimelineFilter] = useState(initailValue);
  const handleFileterState = (value: string) => {
    setTimelineFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };
  return { TimelineFilter, handleFileterState };
};
