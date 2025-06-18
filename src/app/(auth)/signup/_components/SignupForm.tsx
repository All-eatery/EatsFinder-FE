'use client';
import { TextField } from '@/components/atoms/textField';
import { ConfirmEmail } from './ConfirmEmail';
import { VisibilityButtonIcon } from '../../_components/VisibilityButtonIcon';
import { TextFieldWithBtn } from '@/components/molecules/texTFieldWithBtn';
import { Button } from '@/components/atoms';
import { AgreeTerms } from './AgreeTerms';
import { useSignup } from '../../_hooks/useFormData';
import { useNicknameDuplicateCheck } from '../../_hooks/useAuth';

const SignupForm = () => {
  const { register, handleSubmit, watch, errors, setValue, trigger } =
    useSignup();
  const { visibility: pwVisibility, ButtonIcon: PwButtonIcon } =
    VisibilityButtonIcon();
  const { visibility: checkPwVisibility, ButtonIcon: CheckPwButtonIcon } =
    VisibilityButtonIcon();

  const { handleNicknameChecker } = useNicknameDuplicateCheck();
  if (errors.codeValidation) console.log(errors.codeValidation?.message);
  if (errors.acceptPrivacyPolicy)
    if (errors.acceptTerms) console.log(errors.acceptTerms.message);
  return (
    <form className='flex flex-col gap-9' onSubmit={handleSubmit}>
      <TextField
        label='이름'
        placeholder='홍길동'
        {...register('name')}
        errormessage={errors.name?.message}
      />
      <TextField
        {...register('phoneNumber')}
        label='전화번호를 입력해주세요.'
        message="'-'를 제외하고 입력해주세요."
        placeholder='01012345678'
        errormessage={errors.phoneNumber?.message}
      />
      <ConfirmEmail
        register={register}
        watch={watch}
        errormessage={errors}
        setValue={setValue}
        trigger={trigger}
      />
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
      <TextFieldWithBtn
        {...register('nickname')}
        label='닉네임'
        onButtonClick={() =>
          handleNicknameChecker({
            watch,
            setValue,
            trigger,
          })
        }
        placeholder='닉네임을 입력하세요.'
        buttonMessage='중복확인'
        message='한글,영문,숫자 조합 최소 2자~ 최대 12 까지 설정'
        errormessage={errors.nickname?.message}
      />
      <AgreeTerms register={register} />
      <Button type='submit' size={'large'}>
        완료하기
      </Button>
    </form>
  );
};

export default SignupForm;
