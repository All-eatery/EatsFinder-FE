'use client';

import { CheckBoXSVG_Ver2 } from '@/components/svg/CheckBoxSVG';
import { useDeleteAccount } from '../../_hooks/useFormData';
import { ConfirmEmail } from '../../signup/_components/ConfirmEmail';
import { Button, Checkbox } from '@/components/atoms';
import { IconWithText } from '@/components/atoms/iconWithText';
import { useDeleteReason } from '../../_hooks/useDeleteReason';
import { UserData } from '@/types/authType';
enum ReasonForAccountDeletion {
  Unavailability = '원하는 맛집을 못찾았어요.',
  Infrequent = '자주 이용하지 않아요.',
  Privacy = '개인 정보 문제가 걱정돼요.',
  Inconvenience = '서비스 사용성이 불편해요.',
  Switching = '다른 서비스를 이용하고 있어요.',
}

export const DeleteAccountForm = (userEmail: { email: string }) => {
  const { handleSubmit, register, setValue, trigger, watch } =
    useDeleteAccount();

  const { etcReason, handleEtcReasonChange, handleReasonClick, reasonIcon } =
    useDeleteReason(setValue);
  console.log(watch());
  return (
    <form className='flex flex-col gap-[60px]' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6'>
        <h3 className='flex items-center gap-2 text-gray-700 subTitle-28'>
          서비스 탈퇴 사유
          <p className='text-primary-400 subTitle-24'>[필수]</p>
        </h3>
        <div className='flex flex-col gap-3'>
          {Object.keys(ReasonForAccountDeletion).map((key, idx) => {
            const reason =
              ReasonForAccountDeletion[
                key as keyof typeof ReasonForAccountDeletion
              ];
            return (
              <div key={key}>
                <input
                  id={`checkbox-${idx}`}
                  className='sr-only'
                  type='checkbox'
                />
                <label
                  htmlFor={`checkbox-${idx}`}
                  className='flex'
                  onClick={() => handleReasonClick(key)}
                >
                  <IconWithText
                    gap={1}
                    icon={CheckBoXSVG_Ver2({
                      isChecked: reasonIcon(key),
                    })}
                  >
                    {reason}
                  </IconWithText>
                </label>
              </div>
            );
          })}
          <div>
            <input id={`etc`} className='sr-only' type='checkbox' />
            <label htmlFor='etc' onClick={() => handleReasonClick('Etc')}>
              <IconWithText
                gap={1}
                icon={CheckBoXSVG_Ver2({ isChecked: reasonIcon('Etc') })}
              >
                기타
              </IconWithText>
              <textarea
                value={etcReason}
                onChange={(e) => handleEtcReasonChange(e)}
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
            checkDuplicate={false}
            userEmail={userEmail.email}
          />
        </div>
      </div>
      <div className='my-[60px] flex flex-col items-center gap-6'>
        <Checkbox
          className='text-gray-700 body-20'
          {...register('agreed')}
          label='안내 사항을 모두 확인했으며 이에 동의합니다.'
          variant='Checkbox_Ver2'
        />
        <Button size={'large'}>탈퇴 신청하기</Button>
      </div>
    </form>
  );
};
