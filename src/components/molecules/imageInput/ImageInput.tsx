'use client';
import { HTMLAttributes } from 'react';
import { customTwMerge } from '@/utils/customTwMerge';
import { AddSVG } from '@/components/svg/AddSVG';

interface ImageInputProps extends HTMLAttributes<HTMLInputElement> {
  expand: boolean;
}

export const ImageInput = ({ expand, ...props }: ImageInputProps) => {
  return (
    <label
      className={customTwMerge(
        'block h-[250px] w-[250px] cursor-pointer overflow-hidden rounded-3xl border border-dashed border-primary-400',
        expand && 'w-full',
      )}
    >
      <div className='flex h-full w-full items-center justify-center fill-primary-400 [&>svg]:h-12 [&>svg]:w-12'>
        {expand ? (
          <div className='flex h-[60px] w-[280px] items-center justify-center rounded-2xl border border-primary-400 text-primary-400 subTitle-18'>
            사진 업로드 하기
          </div>
        ) : (
          <AddSVG />
        )}
      </div>
      <input
        className='sr-only'
        type='file'
        accept='image/png, image/jpeg, image/bmp, image/webp'
        multiple
        aria-label='upload images'
        {...props}
      />
    </label>
  );
};
