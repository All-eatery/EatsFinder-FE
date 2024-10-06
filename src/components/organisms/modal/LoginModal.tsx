'use client';
import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const LoginModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isLogin = searchParams.get('login');
    setIsOpen(isLogin === 'false' ? true : false);
  }, [searchParams]);

  const handleCloseClick = () => {
    setIsOpen(false);
    router.push(pathname, { scroll: false });
  };

  return (
    <Modal
      isOpen={isOpen}
      size='medium'
      title='앗! 로그인이 필요해요'
      mainButton='로그인 하기'
      subButton='그냥 둘러보기'
      onMainClick={() => router.push('/login')}
      onSubClick={handleCloseClick}
      onClose={handleCloseClick}
    >
      <p className='text-center'>
        로그인하고 ETAS FINDER의 기능을
        <br />
        자유롭게 사용해보세요
      </p>
    </Modal>
  );
};
