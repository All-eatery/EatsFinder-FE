import Image from 'next/image';
import loading from '@/assets/loading/loading.gif';

const Loading = () => {
  return (
    <div className='flex justify-center'>
      <Image src={loading} width={300} height={300} alt='loading' priority />
    </div>
  );
};

export default Loading;
