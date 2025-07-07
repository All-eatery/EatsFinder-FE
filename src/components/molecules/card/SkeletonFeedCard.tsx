import { Skeleton } from '@/components/atoms';

export const SkeletonFeedCard = () => {
  return (
    <div className='flex w-[250px] flex-col gap-2'>
      <Skeleton className='h-[350px] overflow-hidden rounded-3xl'></Skeleton>
      <div className='flex justify-between'>
        <div className='flex items-center justify-center gap-2'>
          <Skeleton className='h-10 w-10 rounded-full'></Skeleton>
          <div className='flex flex-col gap-1'>
            <Skeleton className='h-6 w-32 rounded'></Skeleton>
            <Skeleton className='h-4 w-36 rounded'></Skeleton>
          </div>
        </div>
        <Skeleton className='flex w-9 flex-col items-center justify-center rounded-lg'></Skeleton>
      </div>
    </div>
  );
};
