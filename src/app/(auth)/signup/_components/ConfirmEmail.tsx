import { TextFieldWithBtn } from '@/components/molecules/texTFieldWithBtn';
import { forwardRef, useEffect } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { useEmailConfirm } from '../../_hooks/useEmailConfirm';
import path from 'path';

// 제네릭을 활용한 타입 정의, T는 FieldValues를 상속
type ConfirmEmailProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  errormessage?: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  trigger: UseFormTrigger<T>;
  layoutDirection?: 'col' | 'row';
  checkDuplicate?: boolean;
  userEmail?: string;
};

// 제네릭을 사용한 ConfirmEmail 컴포넌트
export const ConfirmEmail = forwardRef<
  HTMLInputElement,
  ConfirmEmailProps<any>
>(function ConfirmEmail<T extends FieldValues>(
  {
    register,
    watch,
    errormessage,
    setValue,
    trigger,
    layoutDirection = 'col',
    checkDuplicate = true,
    userEmail,
  }: ConfirmEmailProps<T>,
  ref: React.Ref<HTMLInputElement>,
) {
  const { sendEmail, authButtonState, formatTime, time, confirmEmail } =
    useEmailConfirm(setValue, trigger);

  const layout = layoutDirection === 'row' ? 'gap-6' : 'flex-col gap-9';
  const email = userEmail || watch('email' as Path<T>);
  const code = watch('code' as Path<T>);
  useEffect(() => {
    if (email) setValue('email' as Path<T>, email as any);
  }, [email]);
  return (
    <div className={`flex ${layout}`}>
      <TextFieldWithBtn
        {...register('email' as Path<T>)}
        label='이메일'
        buttonMessage='발송하기'
        placeholder='abcd@gmail.com'
        onButtonClick={sendEmail(email, { checkDuplicate })}
        errormessage={errormessage?.email?.message as string | undefined}
        disabled={!!userEmail}
        defaultValue={userEmail}
      />

      <TextFieldWithBtn
        label='인증번호'
        {...register('code' as Path<T>)}
        buttonMessage='인증하기'
        placeholder='인증번호를 입력해주세요.'
        message='이메일로 발송된 인증번호를 입력하세요.'
        timer={formatTime(time)}
        buttonDisabled={!authButtonState}
        onButtonClick={confirmEmail({
          email: email,
          code: code,
        })}
        errormessage={
          errormessage?.codeValidation?.message as string | undefined
        }
      />
    </div>
  );
});
