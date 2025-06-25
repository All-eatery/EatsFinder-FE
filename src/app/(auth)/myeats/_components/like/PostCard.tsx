'use client';
import { SocialActionButton } from '@/app/(auth)/_components/SocialActionButton';
import { ProfileImage } from '@/components/atoms';
import Image from 'next/image';
import Link from 'next/link';
interface PostCardProps {
  id: number;
  src: string;
  profileImage?: string;
  nickname: string;
  isLiked: boolean;
}
export const PostCard = ({
  src,
  profileImage,
  nickname,
  isLiked,
  id,
}: PostCardProps) => {
  return (
    <div className='relative h-[408px] w-[250px] overflow-hidden rounded-3xl'>
      <div className='absolute z-10 h-full w-full rounded-3xl bg-gray-900 bg-opacity-60' />
      <Link href={`/posts/${id}`}>
        <Image
          fill
          alt='게시글 이미지'
          src={src}
          //check 임시 사이즈 설정
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute bottom-5 left-5 z-10 flex items-center gap-2'>
          <ProfileImage src={profileImage} size={60} />
          <span className='text-white subTitle-20'>{nickname}</span>
        </div>
      </Link>
      <SocialActionButton id={id} isConnected={isLiked} type='post' />
    </div>
  );
};
