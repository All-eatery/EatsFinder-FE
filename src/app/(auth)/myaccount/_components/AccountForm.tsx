'use client';
import { VisibilityButtonIcon } from '@/app/(auth)/_components/VisibilityButtonIcon';
import { useChangePassword } from '@/app/(auth)/_hooks/useFormData';
import { Button } from '@/components/atoms';
import { TextField } from '@/components/atoms/textField';
import React from 'react';

export const AccountForm = () => {
  const { errors, handleSubmit, register } = useChangePassword();
  const { visibility: pwVisibility, ButtonIcon: PwButtonIcon } =
    VisibilityButtonIcon();
  const { visibility: checkPwVisibility, ButtonIcon: CheckPwButtonIcon } =
    VisibilityButtonIcon();

  return (
    <form className='flex flex-col items-center gap-9' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-4'>
        <TextField
          {...register('password')}
          type={pwVisibility}
          label='비밀번호'
          placeholder='비밀번호를 입력하세요.'
          message='영문, 숫자, 특수문자(! ? @ # $ % ^ & *)을 포함한 8~16자리를 입력해주세요.'
          icon={<PwButtonIcon />}
          errormessage={errors.password?.message}
        />
        <TextField
          {...register('passwordCheck')}
          type={checkPwVisibility}
          label='비밀번호 확인'
          placeholder='비밀번호를 입력하세요.'
          icon={<CheckPwButtonIcon />}
          errormessage={errors.passwordCheck?.message}
        />
      </div>

      <Button type='submit' size={'large'}>
        수정하기
      </Button>
    </form>
  );
};
