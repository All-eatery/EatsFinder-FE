import { Checkbox } from '@/components/atoms';
import { SignupFormType } from '@/types/authType';
import { forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form';
type AgreeTermsProps = {
  register: UseFormRegister<SignupFormType>;
};
export const AgreeTerms = forwardRef<HTMLInputElement, AgreeTermsProps>(
  function AgreeTerms({ register }, ref) {
    return (
      <div className='flex flex-col gap-1'>
        <label className='text-gray-400 subTitle-16'>약관동의</label>
        <Checkbox
          {...register('acceptTerms')}
          label='[필수]이용약관에 동의합니다.'
        />
        <Checkbox
          {...register('acceptPrivacyPolicy')}
          label='[필수]개인정보 수집•이용에 동의합니다.'
        />
      </div>
    );
  },
);
