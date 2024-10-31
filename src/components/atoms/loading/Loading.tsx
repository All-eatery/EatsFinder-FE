import Image from 'next/image';
import React from 'react';
import loading from '@/assets/loading/loading.gif';

const Loading = () => {
  return (
    <div className='flex justify-center'>
      <Image src={loading} width={0} height={0} alt='loading' priority />;
    </div>
  );
};

export default Loading;
