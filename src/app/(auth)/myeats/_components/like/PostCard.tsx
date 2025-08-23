'use client';
import { SocialActionButton } from '@/app/(auth)/_components/SocialActionButton';
import { ProfileImage } from '@/components/atoms';
import { customTwMerge } from '@/utils/customTwMerge';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { forwardRef } from 'react';
const postCardVariants = cva(
  'relative overflow-hidden rounded-3xl  xl:h-[408px] xl:w-[250px]',
  {
    variants: {
      variant: {
        explore: 'h-[200px] w-[160px]  lg:w-[210px] lg:h-[342px]',
        recent: 'h-[200px] w-[165px]  lg:w-56 ',
      },
    },
    defaultVariants: {
      variant: 'explore',
    },
  },
);
interface PostCardProps extends VariantProps<typeof postCardVariants> {
  id: number;
  src: string;
  profileImage?: string;
  nickname: string;
  isLiked: boolean;
  className?: string;
}

export const PostCard = forwardRef<HTMLDivElement, PostCardProps>(
  ({ src, profileImage, nickname, isLiked, id, className, variant }, ref) => {
    return (
      <div
        ref={ref}
        className={customTwMerge(postCardVariants({ variant, className }))}
      >
        <div className='absolute z-10 h-full w-full rounded-3xl bg-gray-900 bg-opacity-60' />
        <Link href={`/posts/${id}`}>
          <Image
            fill
            alt='게시글 이미지'
            src={src}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute bottom-5 left-5 z-10 flex items-center gap-2'>
            <figure className='hidden xl:block'>
              <ProfileImage src={profileImage} size={60} />
            </figure>
            <span className='text-white subTitle-16 xl:subTitle-20'>
              {nickname}
            </span>
          </div>
        </Link>
        <div className='absolute right-5 top-5 z-10'>
          <SocialActionButton id={id} isConnected={isLiked} type='post' />
        </div>
      </div>
    );
  },
);

PostCard.displayName = 'PostCard';
