'use client';
import { useProfileEdit } from '@/app/(auth)/_hooks/useFormData';
import { useImageInput } from '@/app/(auth)/_hooks/useImageInput';
import { Button, ProfileImage } from '@/components/atoms';
import { TextField } from '@/components/atoms/textField';
import { EditSVG } from '@/components/svg/EditSVG';
import { UserData } from '@/types/authType';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
type ProfileEditProps = {
  handler: () => void;
  userData: UserData;
};
export const ProfileEdit = ({ handler, userData }: ProfileEditProps) => {
  const { nickname, phoneNumber, profileImage } = userData;
  const { register, watch, handleSubmit, errors, setValue } = useProfileEdit();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const { handleFileChange, handleImageInput, previewImage } = useImageInput();
  useEffect(() => {
    setValue('profileImage', userData.profileImage);
    if (previewImage) setValue('profileImage', previewImage);
  }, [previewImage]);
  return (
    <div>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='flex flex-col items-center gap-2'>
          <div className='relative'>
            <div
              className='relative h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-full'
              onClick={() => handleImageInput(imageInputRef)}
            >
              <input
                {...register('profileImage')}
                type='file'
                accept='image/*'
                ref={imageInputRef}
                className='sr-only'
                onChange={(e) => handleFileChange(e)}
              />
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt='profile image preview'
                  fill={true}
                  className='object-cover'
                />
              ) : (
                <ProfileImage src={profileImage} size={100} />
              )}
            </div>
            <div className='absolute bottom-1 right-1'>
              <EditSVG x='20' y='20' />
            </div>
          </div>

          <TextField
            label='닉네임'
            defaultValue={nickname}
            {...register('nickname')}
            errormessage={errors.nickname?.message}
          />
          <TextField
            label='전화번호'
            defaultValue={phoneNumber}
            {...register('phoneNumber')}
            errormessage={errors.phoneNumber?.message}
          />
        </div>
        <div className='my-4 flex gap-2'>
          <Button
            type='button'
            size={'mini'}
            variant={'stroke'}
            onClick={handler}
          >
            취소하기
          </Button>
          <Button type='submit' size={'mini'}>
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
};
