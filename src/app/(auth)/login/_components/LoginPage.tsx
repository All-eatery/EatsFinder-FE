import { Button } from '@/components/atoms';
import { SocialLoginBtnGroup } from './SocialLoginBtn';
import Link from 'next/link';
import { LoginForm } from './LoginForm';
import { searchParams } from '@/types/authType';
import { LoginError } from './LoginError';
import { cookies } from 'next/headers';

export const LoginPage = ({ searchParams }: searchParams) => {
  const socialProvider = cookies().get('socialProvider')?.value;
  console.log(searchParams?.error);
  return (
    <>
      <h2 className='mb-6 text-gray-800 title-30'>로그인</h2>
      <div className='flex flex-col gap-8'>
        {/* {searchParams?.error && <LoginError />} */}
        <LoginForm />
        <SocialLoginBtnGroup socialProvider={socialProvider} />
      </div>
      <Link href='/signup'>
        <Button size={'large'} variant={'stroke'}>
          회원가입하기
        </Button>
      </Link>
    </>
  );
};
