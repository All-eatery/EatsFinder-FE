import { KOTLIN_SERVER, NEST_SERVER } from '@/constants/baseUrl';
import { useToast } from '@/provider/contextProvider/ToastProvider';
import {
  ChagePasswordType,
  DeleteAccountType,
  LoginFormType,
  ProfileEditType,
  ReasonForAccountDeletion,
  SignupFormType,
} from '@/types/authType';
import { SignupType } from '@/types/authType';
import { getUserToken } from '@/utils/getServerUserInfo';
import { urlToFile } from '@/utils/urlToFile';
import { error } from 'console';
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
  const { showToast } = useToast();
  const handleNicknameChecker = async ({
    watch,
    setValue,
    trigger,
  }: isDuplicatedNicknameProps) => {
    const response = await isDuplicatedNickname(watch('nickname'));
    if (response.error) {
      setValue('nicknameDuplicated', false);
      trigger('nicknameDuplicated');
      showToast(response.message, 'error');
    } else {
      setValue('nicknameDuplicated', true);
      trigger('nicknameDuplicated');
      showToast(response.message, 'success');
    }
  };
  return { handleNicknameChecker };
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
  const token = await accessToken;
  if (!token) {
    throw new Error('Access token is missing');
  }
  console.log(Array.from(formData.entries()));

  const response = await fetch(`${KOTLIN_SERVER}/users`, {
    method: 'PATCH',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response;
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
  const { email, etcReason, deleteReason } = data;
  const token = await accessToken;
  const queryParams: { [key: string]: boolean | string } = {
    unavailability: false,
    infrequent: false,
    privacy: false,
    inconvenience: false,
    switching: false,
    others: false,
  };
  for (const key in ReasonForAccountDeletion) {
    if (deleteReason.includes(key)) {
      queryParams[key.toLowerCase()] = true;
    }
  }
  if (deleteReason.includes('Etc')) {
    queryParams['others'] = true;
    queryParams['reason'] = encodeURIComponent(etcReason || '');
  }
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => value !== undefined && `${key}=${value}`)
    .join('&');
  const requestUrl = `${KOTLIN_SERVER}/users?email=${email}&${queryString}`;

  const response = await fetch(requestUrl, {
    method: 'DELETE',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
