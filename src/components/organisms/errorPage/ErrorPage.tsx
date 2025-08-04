'use client';
import { Button } from '@/components/atoms';
import { LogoImgSVG } from '@/components/svg/LogoSVG';
import { statusError } from '@/constants/statusError';
import { useRouter } from 'next/navigation';

export const ErrorPage = ({ statusCode }: { statusCode: number }) => {
  const errorInfo = statusError[statusCode] || statusError[404];
  const router = useRouter();
  return (
    <div className='flex flex-col items-center gap-8 text-center lg:gap-16'>
      <div className='flex items-center gap-1.5 text-6xl font-medium text-primary-400 md:gap-2 md:text-8xl lg:gap-3 lg:text-9xl'>
        <p>{errorInfo.numbering[0]}</p>
        <LogoImgSVG className='hidden h-[103px] w-24 lg:block' />
        <LogoImgSVG className='hidden h-[83px] w-[75px] md:block lg:hidden' />
        <LogoImgSVG className='block h-[63px] w-[54px] md:hidden' />
        <p>{errorInfo.numbering[1]}</p>
      </div>
      <div className='flex flex-col items-center gap-2 lg:gap-4'>
        <h2 className='text-gray-700 title-24 lg:title-40'>
          {errorInfo.msg.title}
        </h2>
        <h3 className='flex flex-col items-center text-gray-700 body-12 md:body-16 lg:body-20'>
          {errorInfo.msg.description.map((msg, i) => {
            return <span key={i}>{msg}</span>;
          })}
        </h3>
      </div>
      <div className='flex w-full justify-center gap-3 lg:max-w-none lg:gap-4'>
        <Button
          onClick={() => router.back()}
          variant={'stroke'}
          className='grow subTitle-12 sm:subTitle-14 md:subTitle-16 lg:grow-0 lg:subTitle-18'
        >
          이전 페이지로 돌아가기
        </Button>
        <Button
          onClick={() => router.push('/')}
          variant={'stroke'}
          className='grow subTitle-12 sm:subTitle-14 md:subTitle-16 lg:grow-0 lg:subTitle-18'
        >
          홈으로
        </Button>
      </div>
    </div>
  );
};
