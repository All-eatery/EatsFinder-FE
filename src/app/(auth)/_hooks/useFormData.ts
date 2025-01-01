import {
  ChagePasswordType,
  DeleteAccountType,
  LoginFormType,
  ProfileEditType,
  SignupFormType,
} from '@/types/authType';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  changePassword,
  deleteAccount,
  editUserProfile,
  login,
  signup,
} from './useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DeleteAccountSchema,
  changePasswordSchema,
  loginSchema,
  profileEditSchema,
  signupSchema,
} from '@/utils/zodSchema';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/provider/contextProvider/ToastProvider';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const response = await login(data);
      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        showToast(responseData.message, 'error');
        return;
      }

      showToast(responseData.message, 'success');

      if (responseData.redirectUrl) {
        window.location.href = '/';
      }
    } catch (error) {
      showToast('서버와의 연결에 실패했습니다.', 'error');
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export const useSignup = () => {
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<SignupFormType>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormType> = async (data) => {
    const { acceptPrivacyPolicy, acceptTerms, code } = data;
    if (acceptPrivacyPolicy && acceptTerms && code) {
      const response = await signup(data);
      if (response.statusCode) {
        showToast(response.message, 'error');
      }
      if (!response.statusCode) {
        showToast('회원가입이 완료되셨습니다.', 'success');
        window.location.href = '/login';
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    errors,
    setValue,
    trigger,
  };
};
export const useProfileEdit = (handler: () => void) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<ProfileEditType>({
    mode: 'onBlur',
    resolver: zodResolver(profileEditSchema),
  });

  const onSubmit: SubmitHandler<ProfileEditType> = async (formData) => {
    try {
      const response = await editUserProfile(formData);
      const data = await response.json();
      if (data.statusCode === 'ERROR') {
        showToast(Object.keys(data.data)[0], 'error');
        return;
      }
      console.log('성공 데이터', data);
      queryClient.invalidateQueries({
        queryKey: ['userProfile', 'LoggedInUserInfo'],
      });
      showToast(data.message, 'success');
      handler();
    } catch (error) {
      showToast('서버에서 에러가 발생했습니다.', 'error');
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    trigger,
    errors,
    setValue,
  };
};

export const useChangePassword = () => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChagePasswordType>({
    mode: 'onBlur',
    resolver: zodResolver(changePasswordSchema),
  });
  const onSubmit: SubmitHandler<ChagePasswordType> = async (data) => {
    try {
      const response = await changePassword(data);
      if (response.statusCode === 'ERROR') {
        showToast('기존 비밀번호와 동일힙니다.', 'error');
        return;
      }
      showToast(response.message, 'success');
    } catch (error) {
      showToast(
        '비밀번호 변경중 에러가 발생했습니다. 잠시후 다시 시도해 주세요.',
        'error',
      );
    }
  };
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export const useDeleteAccount = () => {
  const { register, watch, handleSubmit, setValue, trigger } =
    useForm<DeleteAccountType>({
      resolver: zodResolver(DeleteAccountSchema),
    });
  const onSubmit: SubmitHandler<DeleteAccountType> = async (data) => {
    const response = await deleteAccount(data);
  };
  return {
    register,
    watch,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    trigger,
  };
};
