import { useState } from 'react';
import { useTimer } from './useTimer';
import { EmailConfirmType, SignupFormType } from '@/types/authType';
import { debounce } from 'lodash';
import { emailRegex } from '@/utils/zodSchema';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { KOTLIN_SERVER } from '@/constants/baseUrl';

export const useEmailConfirm = (
  setValue: UseFormSetValue<SignupFormType>,
  trigger: UseFormTrigger<SignupFormType>,
) => {
  const [authButtonState, setAuthButtonState] = useState(false);
  const { time, startTimer, formatTime } = useTimer(300);
  const sendEmail = (email: string) =>
    //쓰로틀링이 더 나을까?
    debounce(async () => {
      if (isValidEmail(email)) {
        // const response = await isDuplicateEmail(email);
        // if (response.statusCode === 'SUCCESS') {
        const response = await sendCode(email);
        if (response.statusCode === 'SUCCESS') {
          console.log(response.message);
        } else if (response.statusCode === 'ERROR') {
        }
        console.log('이메일방송', response);
        setAuthButtonState(true);
        startTimer();
        // } else {
        //   return console.log('이미 가입된 이메일 입니다.');
        // }
      }
    }, 1000);

  const confirmEmail = (data: EmailConfirmType) => async () => {
    const response = await confirmCode(data);
    if (response.statusCode === 'SUCCESS') {
      setValue('codeValidation', true);
      trigger('codeValidation');
      console.log('인증완료');
    } else if (response.statusCode === 'ERROR') {
      setValue('codeValidation', false);
      trigger('codeValidation');
      return console.log('인증번호가 만료되지 않았습니다');
    }
    return response;
  };

  return { sendEmail, authButtonState, formatTime, time, confirmEmail };
};

const isDuplicateEmail = async (email: string) => {
  try {
    const response = await fetch(
      `${KOTLIN_SERVER}/auth/email/{provider}?email=${email}&provider=LOCAL`,
      {
        method: 'GET',
        headers: {
          accept: '*/*',
        },
      },
    );
    return response.json();
  } catch (error) {
    throw new Error('이메일 중복 검사 중 오류가 발생했습니다.');
  }
};
const sendCode = async (email: string) => {
  const response = await fetch(`${KOTLIN_SERVER}/auth/email`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      email,
    }),
  });
  return response.json();
};
const confirmCode = async (data: EmailConfirmType) => {
  const { code, email } = data;
  const response = await fetch(
    `${KOTLIN_SERVER}/auth/email/verify-code?email=${email}&code=${code}`,
    {
      method: 'GET',
      headers: { accept: '*/*' },
    },
  );

  return response.json();
};
const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};
