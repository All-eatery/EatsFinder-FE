import Image from 'next/image';
import React from 'react';
import loading from '@/assets/loading/loading.gif';

const Loading = () => {
  return <Image src={loading} width={0} height={0} alt='loading' priority />;
};

export default Loading;
