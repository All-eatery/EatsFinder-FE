export type UserData = {
  id: number;
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  followingCount: number;
  followerCount: number;
  postCount: number;
  userType: string;
};
export type ProfilePageProps = {
  userData: UserData;
};
export type LoginFormType = {
  email: string;
  password: string;
};
export type SignupFormType = {
  name: string;
  phoneNumber: string;
  email: string;
  code: string;
  codeValidation: boolean;
  password: string;
  passwordCheck: string;
  nickname: string;
  nicknameDuplicated: boolean;
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
};
export type ProfileEditType = {
  nickname: string;
  phoneNumber: string;
  profileImage: string;
  // profileImage: File | Blob;
};
export type ChagePasswordType = {
  password: string;
  passwordCheck: string;
};
export type SignupType = Omit<
  SignupFormType,
  | 'passwordCheck'
  | 'code'
  | 'acceptTerms'
  | 'acceptPrivacyPolicy'
  | 'codeValidation'
  | 'nicknameDuplicated'
>;
export type EmailConfirmType = {
  email: string;
  code: string;
};
export type DeleteAccountType = {
  deleteReason: string[];
  email: string;
  code: string;
  codeValidation: boolean;
  agreed: boolean;
  etcReason?: string;
};
export type searchParams = {
  params?: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};
export interface CookieOptions {
  domain?: string | undefined;
  expires?: number | Date | undefined;
  httpOnly?: boolean | undefined;
  maxAge?: number | undefined;
  name?: string | undefined;
  partitioned?: boolean | undefined;
  path?: string | undefined;
  priority?: 'medium' | 'low' | 'high' | undefined;
  sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean | undefined;
  value?: string | undefined;
}
export enum ReasonForAccountDeletion {
  Unavailability = '원하는 맛집을 못찾았어요.',
  Infrequent = '자주 이용하지 않아요.',
  Privacy = '개인 정보 문제가 걱정돼요.',
  Inconvenience = '서비스 사용성이 불편해요.',
  Switching = '다른 서비스를 이용하고 있어요.',
}
