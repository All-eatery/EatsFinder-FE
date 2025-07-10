import { Skeleton } from '@/components/atoms';

export const SkeletonCard = () => {
  return (
    <div className='w-[250px]'>
      <Skeleton className='relative mb-2 h-[250px] rounded-[24px]'></Skeleton>
      <div className='flex h-14 flex-col gap-2'>
        <Skeleton className='h-5 w-full rounded-full'></Skeleton>
        <Skeleton className='h-4 w-full rounded-full'></Skeleton>
      </div>
    </div>
  );
};
