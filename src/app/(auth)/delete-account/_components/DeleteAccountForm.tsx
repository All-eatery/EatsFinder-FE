'use client';

import { CheckBoXSVG_Ver2 } from '@/components/svg/CheckBoxSVG';
import { useSignup } from '../../_hooks/useFormData';
import { ConfirmEmail } from '../../signup/_components/ConfirmEmail';
import { Button } from '@/components/atoms';
import { IconWithText } from '@/components/atoms/iconWithText';
type DeleteAccountFormType = {
  reasonForAccountDeletion: string[];
};
export const DeleteAccountForm = ({
  reasonForAccountDeletion,
}: DeleteAccountFormType) => {
  const { errors, handleSubmit, register, setValue, trigger, watch } =
    useSignup();
  return (
    <form className='flex flex-col gap-[60px]'>
      <div className='flex flex-col gap-6'>
        <h3 className='flex items-center gap-2 text-gray-700 subTitle-28'>
          서비스 탈퇴 사유
          <p className='text-primary-400 subTitle-24'>[필수]</p>
        </h3>
        <div className='flex flex-col gap-3'>
          {reasonForAccountDeletion.map((reason, idx) => {
            return (
              <div key={idx}>
                <input
                  type='radio'
                  id={`checkbox-${idx}`}
                  name='deletionReason'
                  className='sr-only'
                />
                <label htmlFor={`checkbox-${idx}`} className='flex'>
                  <IconWithText
                    gap={1}
                    icon={CheckBoXSVG_Ver2({ isChecked: 'blank' })}
                  >
                    {reason}
                  </IconWithText>
                </label>
              </div>
            );
          })}
          <div>
            <input
              type='radio'
              id={`etc`}
              name='deletionReason'
              className='sr-only'
            />
            <label htmlFor='etc'>
              <IconWithText
                gap={1}
                icon={CheckBoXSVG_Ver2({ isChecked: 'blank' })}
              >
                기타
              </IconWithText>
              <textarea
                className='h-24 w-full resize-none overflow-auto border border-gray-200 p-2 body-16'
                placeholder='소중한 의견을 남겨주시면 더 나은 서비스를 제공하도록 노력하겠습니다.'
              />
            </label>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-6'>
        <h3 className='flex items-center gap-2 text-gray-700 subTitle-28'>
          이메일 인증하기
          <p className='text-primary-400 subTitle-24'>[필수]</p>
        </h3>
        <div>
          <ConfirmEmail
            layoutDirection='row'
            register={register}
            setValue={setValue}
            trigger={trigger}
            watch={watch}
          />
        </div>
      </div>
      <div className='my-[60px] flex flex-col items-center gap-6'>
        <IconWithText gap={1} icon={CheckBoXSVG_Ver2({ isChecked: 'blank' })}>
          안내 사항을 모두 확인했으며 이에 동의합니다.
        </IconWithText>
        <Button size={'large'}>탈퇴 신청하기</Button>
      </div>
    </form>
  );
};
