import Image from 'next/image';
import { Button } from '@/components/atoms';

export const UserCard = ({ user }) => {
  return (
    <div className='flex w-[324px] flex-col gap-6 rounded-3xl border border-gray-200 p-[30px]'>
      <div>
        <div>
          <Image></Image>
          <div className='text-gray-900 subTitle-20'>이름</div>
        </div>
        <div className='grid grid-cols-2 divide-x text-gray-500 body-16'>
          <div className='text-center'>게시물 9999</div>
          <div className='text-center'>팔로워 9999</div>
        </div>
      </div>
      <div className='flex justify-center'>
        <Button className='h-[50px] w-[200px] rounded-full'>팔로우</Button>
      </div>
    </div>
  );
};
