'use client';

import { CheckBoXSVG_Ver2 } from '@/components/svg/CheckBoxSVG';
import { useDeleteAccount, useSignup } from '../../_hooks/useFormData';
import { ConfirmEmail } from '../../signup/_components/ConfirmEmail';
import { Button } from '@/components/atoms';
import { IconWithText } from '@/components/atoms/iconWithText';
import { useState } from 'react';

const reasonForAccountDeletion = [
  '원하는 맛집을 못찾았어요.',
  '자주 이용하지 않아요.',
  '개인 정보 문제가 걱정돼요.',
  '서비스 사용성이 불편해요.',
  '다른 서비스를 이용하고 있어요.',
];
export const DeleteAccountForm = () => {
  const { handleSubmit, register, setValue, trigger, watch } =
    useDeleteAccount();
  console.log(watch());
  // const handleClick=(e: MouseEvent<HTMLDivElement, MouseEvent>)=>{
  //   console.log(e)
  // }
  // const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  // };
  const [selectedReason, setSelectedReason] = useState('');
  const reasonIcon = (reason: string) => {
    return selectedReason === reason ? 'check' : 'blank';
  };
  const handleReasonClick = (value: string) => {
    setSelectedReason(value);
    console.log(selectedReason);
    setValue('deleteReason', value);
    console.log(watch());
  };
  const [isAgreed, setIsAgreed] = useState(false);
  const handleAgreed = () => {
    setIsAgreed((prev) => !prev);
    setValue('agreed', isAgreed);
  };
  const agreedIcon = () => {
    return isAgreed ? 'check' : 'blank';
  };

  return (
    <form className='flex flex-col gap-[60px]' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-6'>
        <h3 className='flex items-center gap-2 text-gray-700 subTitle-28'>
          서비스 탈퇴 사유
          <p className='text-primary-400 subTitle-24'>[필수]</p>
        </h3>
        <div className='flex flex-col gap-3'>
          {reasonForAccountDeletion.map((reason, idx) => {
            return (
              <div key={idx} onClick={() => handleReasonClick(reason)}>
                <input
                  type='radio'
                  id={`checkbox-${idx}`}
                  name='deletionReason'
                  className='sr-only'
                />
                <label htmlFor={`checkbox-${idx}`} className='flex'>
                  <IconWithText
                    gap={1}
                    icon={CheckBoXSVG_Ver2({
                      isChecked: reasonIcon(reason),
                    })}
                  >
                    {reason}
                  </IconWithText>
                </label>
              </div>
            );
          })}
          <div onClick={() => handleReasonClick('etc')}>
            <input
              type='radio'
              id={`etc`}
              name='deletionReason'
              className='sr-only'
              // onChange={(e) => handleReasonChange(e)}
            />
            <label htmlFor='etc'>
              <IconWithText
                gap={1}
                icon={CheckBoXSVG_Ver2({ isChecked: reasonIcon('etc') })}
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
            checkDuplicate={false}
          />
        </div>
      </div>
      <div
        className='my-[60px] flex flex-col items-center gap-6'
        onClick={handleAgreed}
      >
        <IconWithText
          gap={1}
          icon={CheckBoXSVG_Ver2({ isChecked: agreedIcon() })}
        >
          안내 사항을 모두 확인했으며 이에 동의합니다.
        </IconWithText>
        <Button size={'large'}>탈퇴 신청하기</Button>
      </div>
    </form>
  );
};
