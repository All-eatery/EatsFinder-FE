'use client';
import Image from 'next/image';
import { customTwMerge } from '@/utils/customTwMerge';
import { CircleCloseSVG, CloseSVG } from '@/components/svg/CloseSVG';

export const PostPreview = ({
  src,
  isMainImg,
  onImageRemove,
  onMainImgChange,
}: {
  src: string;
  isMainImg: boolean;
  onImageRemove: () => void;
  onMainImgChange: () => void;
}) => {
  return (
    <div
      className={customTwMerge(
        'relative z-50 h-[250px] w-[250px] cursor-pointer overflow-hidden rounded-3xl',
      )}
    >
      <Image src={src} fill alt='preview' />
      <div
        className={customTwMerge(
          'group absolute h-full w-full rounded-3xl hover:backdrop-brightness-50',
          isMainImg && 'shadow-[inset_0_0_0_4px_theme(colors.primary.400)]',
        )}
      >
        <div
          className={customTwMerge(
            'absolute left-6 top-6 hidden h-[26px] w-[50px] cursor-pointer items-center justify-center rounded-xl bg-gray-100 text-gray-300 subTitle-14 group-hover:flex',
            isMainImg && 'flex bg-primary-400 text-white',
          )}
          onClick={() => onMainImgChange()}
        >
          대표
        </div>
        <div
          className='absolute right-6 top-6 hidden cursor-pointer rounded-full group-hover:block'
          onClick={onImageRemove}
        >
          <CircleCloseSVG />
        </div>
      </div>
    </div>
  );
};
