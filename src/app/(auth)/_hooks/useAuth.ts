import { KOTLIN_SERVER, NEST_SERVER } from '@/constants/baseUrl';
import {
  ChagePasswordType,
  DeleteAccountType,
  LoginFormType,
  ProfileEditType,
  SignupFormType,
} from '@/types/authType';
import { SignupType } from '@/types/authType';
import { getUserToken } from '@/utils/getServerUserInfo';
import { UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form';
const accessToken = getUserToken();

export const login = async (data: LoginFormType) => {
  const { email, password } = data;
  const response = await fetch(`api/auth/login`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return response;
};

export const signup = async (data: SignupType) => {
  const { email, name, nickname, password, phoneNumber } = data;
  const response = await fetch(`${NEST_SERVER}/auth/signup`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      phoneNumber,
      email,
      password,
      nickname,
      profileImage: null,
    }),
  });
  return response.json();
};
export const isDuplicatedNickname = async (nickname: string) => {
  const response = await fetch(`${NEST_SERVER}/users/nickname/${nickname}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
    },
  });
  return response.json();
};
type isDuplicatedNicknameProps = {
  setValue: UseFormSetValue<SignupFormType>;
  trigger: UseFormTrigger<SignupFormType>;
  watch: UseFormWatch<SignupFormType>;
};
export const useNicknameDuplicateCheck = () => {
  const handleNicknameChecker = async ({
    watch,
    setValue,
    trigger,
  }: isDuplicatedNicknameProps) => {
    const response = await isDuplicatedNickname(watch('nickname'));
    if (response.error) {
      setValue('nicknameDuplicated', false);
      trigger('nicknameDuplicated');
      console.log(response.message);
    } else {
      setValue('nicknameDuplicated', true);
      trigger('nicknameDuplicated');
      console.log(response.message);
    }
  };
  return { handleNicknameChecker };
};
const urlToFile = async (url: string, filename: string): Promise<File> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
};
export const editUserProfile = async (data: ProfileEditType) => {
  const { nickname, phoneNumber, profileImage } = data;
  const formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('phoneNumber', phoneNumber);
  if (profileImage) {
    const file = await urlToFile(profileImage, 'profile.png');
    formData.append('profileImage', file);
  }
  try {
    const token = await accessToken;
    if (!token) {
      throw new Error('Access token is missing');
    }

    const response = await fetch(`${KOTLIN_SERVER}/users`, {
      method: 'PATCH',
      headers: {
        accept: '*/*',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log('응답:', await response.json());

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

export const changePassword = async (data: ChagePasswordType) => {
  const { password, passwordCheck } = data;
  const token = await accessToken;
  const response = await fetch(`${KOTLIN_SERVER}/users/new-password`, {
    method: 'PUT',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newPassword: password,
      passwordConfirm: passwordCheck,
    }),
  });
  return response.json();
};

export const deleteAccount = async (data: DeleteAccountType) => {
  const { email, code, etcReason, deleteReason } = data;
  const token = await accessToken;

  console.log('여기', deleteReason);
  console.log(etcReason);
  return;
  const response = await fetch(`${KOTLIN_SERVER}/users/?reasonType=`, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      code,
      reason: etcReason,
    }),
  });
};
