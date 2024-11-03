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
export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    const response = await login(data);
    if (response) {
      window.location.href = `${response.url}`;
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
  };
};

export const useSignup = () => {
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
        alert(response.message);
      }
      if (!response.statusCode) {
        alert('회원가입이 완료되셨습니다.');
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
    handler();

    const response = await editUserProfile(formData);
    const data = await response.json();
    if (data.statusCode === 'SUCCESS') {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      handler();
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
    } catch (error) {
      console.error('Error changing password:', error);
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
