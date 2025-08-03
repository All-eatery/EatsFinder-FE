import { AddSVG } from '@/components/svg/AddSVG';
import Link from 'next/link';

export const PostingButton = () => {
  return (
    <div className='fixed bottom-16 right-5 z-30 lg:bottom-5'>
      <Link
        href='/post/new'
        className='flex h-12 w-12 items-center justify-center rounded-full bg-primary-400 lg:h-20 lg:w-20'
      >
        <AddSVG isUsable={false} width={45} height={45} />
      </Link>
    </div>
  );
};
