import { TextFieldWithBtn } from '@/components/molecules/texTFieldWithBtn';
import React, { forwardRef } from 'react';
import { SignupFormType } from '@/types/authType';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { useEmailConfirm } from '../../_hooks/useEmailConfirm';
type ConfrimEmailProps = {
  register: UseFormRegister<SignupFormType>;
  watch: UseFormWatch<SignupFormType>;
  errormessage?: FieldErrors<SignupFormType>;
  setValue: UseFormSetValue<SignupFormType>;
  trigger: UseFormTrigger<SignupFormType>;
  layoutDirection?: 'col' | 'row';
};
//컨펌보낼 때 사용중인 이메일인지 확인도 해야할듯?
export const ConfirmEmail = forwardRef<HTMLInputElement, ConfrimEmailProps>(
  function ConfirmEmail(
    { register, watch, errormessage, setValue, trigger, layoutDirection },
    ref,
  ) {
    const { sendEmail, authButtonState, formatTime, time, confirmEmail } =
      useEmailConfirm(setValue, trigger);
    const layout = (() => {
      switch (layoutDirection) {
        case 'row':
          return 'gap-6';
        case 'col':
        default:
          return 'flex-col gap-9';
      }
    })();
    console.log(layout);
    return (
      <div className={`flex ${layout}`}>
        <TextFieldWithBtn
          {...register('email')}
          label='이메일'
          buttonMessage='발송하기'
          placeholder='abcd@gamil.com'
          onButtonClick={sendEmail(watch('email'))}
          errormessage={errormessage?.email?.message}
        />

        <TextFieldWithBtn
          label='인증번호'
          {...register('code')}
          buttonMessage='인증하기'
          placeholder='인증번호를 입력해주세요.'
          message='이메일로 발송된 인증번호를 입력하세요.'
          timer={formatTime(time)}
          buttonDisabled={!authButtonState}
          onButtonClick={confirmEmail({
            email: watch('email'),
            code: watch('code'),
          })}
          errormessage={errormessage?.codeValidation?.message}
        />
      </div>
    );
  },
);
