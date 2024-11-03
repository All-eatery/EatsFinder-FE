import { z } from 'zod';

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const phoneRegex = /^010\d{8}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!?\@#\$%\^&\*])[A-Za-z0-9!?\@#\$%\^&\*]{8,16}$/i;
const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,12}$/;
const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const ACCEPTED_IMAGE_TYPES = ['jpeg', 'jpg', 'png', 'webp'];
export const loginSchema = z.object({
  email: z
    .string({ required_error: '이메일을 입력해주세요.' })
    .regex(emailRegex, { message: '이메일 양식에 맞게 작성해주세요.' }),
  password: z
    .string({ required_error: '비밀번호를 입력해주세요.' })
    .regex(passwordRegex, {
      message:
        '영문, 숫자, 특수문자(! ? @ # $ % ^ & *)을 포함한 8~16자리를 입력해주세요.',
    }),
});
export const signupSchema = z
  .object({
    name: z
      .string({ required_error: '이름을 입력해주세요.' })
      .min(2, { message: '이름은 2글자 이상이어야 합니다.' }),
    phoneNumber: z
      .string({ required_error: '전화번호를 입력해주세요.' })
      .regex(phoneRegex, { message: '전화번호 양식에 맞게 작성해주세요.' }),
    email: z
      .string({ required_error: '이메일을 입력해주세요.' })
      .regex(emailRegex, { message: '이메일 양식에 맞게 작성해주세요.' }),
    code: z.string(),
    codeValidation: z.boolean().refine((data) => data === true, {
      message: '인증번호가 올바르지 않습니다',
    }),
    password: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .regex(passwordRegex, {
        message:
          '영문, 숫자, 특수문자(! ? @ # $ % ^ & *)을 포함한 8~16자리를 입력해주세요.',
      }),
    passwordCheck: z.string({ required_error: '비밀번호를 확인해주세요.' }),

    nickname: z
      .string({ required_error: '닉네임을 입력해주세요.' })
      .regex(nicknameRegex, {
        message:
          '한글,영문,숫자를 사용하여 최소 2자에서 최대 12자의 닉네임을 입력해주세요.',
      }),
    nicknameDuplicated: z.boolean(),
    acceptTerms: z
      .boolean()
      .default(false)
      .refine((data) => data === true, {
        message: '이용약관에 동의해야 합니다.',
      }),
    acceptPrivacyPolicy: z
      .boolean()
      .default(false)
      .refine((data) => data === true, {
        message: '개인정보 수집•이용에 동의해야 합니다.',
      }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  })
  .refine((data) => data.nicknameDuplicated === true, {
    message: '이미 사용중인 닉네임 입니다.',
    path: ['nickname'],
  });

export const profileEditSchema = z.object({
  profileImage: z.any().nullable(),
  // .refine((files) => {
  //   return files?.[0]?.size <= MAX_FILE_SIZE;
  // }, `이미지의 최대 크기는 5MB 입니다.`)
  // .refine(
  //   (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
  //   '.jpg,.jpeg,.png.webp 형식만 지원됩니다.',
  // )
  nickname: z
    .string({ required_error: '닉네임을 입력해주세요.' })
    .regex(nicknameRegex, {
      message:
        '한글,영문,숫자를 사용하여 최소 2자에서 최대 12자의 닉네임을 입력해주세요.',
    }),
  phoneNumber: z
    .string({ required_error: '전화번호를 입력해주세요.' })
    .regex(phoneRegex, { message: '전화번호 양식에 맞게 작성해주세요.' }),
});
// .refine((data) => data.nicknameDuplicated === true, {
//   message: '이미 사용중인 닉네임 입니다.',
//   path: ['nickname'],
// });

export const changePasswordSchema = z
  .object({
    password: z
      .string({ required_error: '비밀번호를 입력해주세요.' })
      .regex(passwordRegex, {
        message:
          '영문, 숫자, 특수문자(! ? @ # $ % ^ & *)을 포함한 8~16자리를 입력해주세요.',
      }),
    passwordCheck: z.string({ required_error: '비밀번호를 확인해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

export const postFormSchema = z.object({
  placeId: z.number({
    required_error: '맛집을 선택해주세요',
  }),
  placeName: z.string(),
  content: z.string(),
  starRating: z.number(),
  menus: z.string().array().max(5),
  keywords: z.string().array().max(5),
  imgs: z.any().array(),
  preview: z.string().array(),
  mainImgIndex: z.number(),
});

export type PostFormValue = z.infer<typeof postFormSchema>;

export const DeleteAccountSchema = z.object({
  deleteReason: z.string().array(),
  email: z.string(),
  code: z.string(),
  codeValidation: z.boolean(),
  agreed: z.boolean(),
  etcReason: z.string().nullish(),
});
