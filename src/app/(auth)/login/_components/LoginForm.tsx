'use client';
import { Button } from '@/components/atoms';
import { TextField } from '@/components/atoms/textField/TextField';
import Link from 'next/link';
import { SaveLoginState } from './SaveLoginState';
import { useLogin } from '../../_hooks/useFormData';
import { VisibilityButtonIcon } from '../../_components/VisibilityButtonIcon';
export const LoginForm = () => {
  const { register, handleSubmit, errors } = useLogin();
  const { visibility, ButtonIcon } = VisibilityButtonIcon();
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
      <div className='flex flex-col gap-3'>
        <TextField
          placeholder='이메일을 입력하세요.'
          {...register('email')}
          errormessage={errors.email?.message}
        />
        <TextField
          type={visibility}
          placeholder='비밀번호를 입력하세요.'
          {...register('password')}
          icon={<ButtonIcon />}
          errormessage={errors.password?.message}
        />
        <div className='flex justify-between text-gray-300 body-14'>
          <p>
            <SaveLoginState />
          </p>
          <Link href='/find-account'>비밀번호 찾기</Link>
        </div>
      </div>
      <Button type='submit' size={'large'}>
        로그인 하기
      </Button>
    </form>
  );
};
