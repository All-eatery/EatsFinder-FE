import { customTwMerge } from '@/utils/customTwMerge';

export const Skeleton = ({ className }: { className: string }) => {
  return (
    <div
      className={customTwMerge('animate-pulse bg-gray-300', className)}
    ></div>
  );
};
