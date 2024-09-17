export type UserData = {
  id: number;
  nickname: string;
  email: string;
  phoneNumber?: string;
  profileImage: string;
  followingCount: number;
  followerCount: number;
  postCount: number;
  userType?: string;
};
export type UserProfile = {
  userData: UserData;
};

export type ProfilePageProps = {
  userData: UserData;
  isOwnProfile: boolean;
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
