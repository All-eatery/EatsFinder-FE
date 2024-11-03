'use client';
import { useDeletePostModal } from '@/app/(auth)/_hooks/useModal';
import { FeedOptionMenu } from '@/app/(auth)/profile/[userId]/_components/FeedOptionMenu';
import { Modal } from '@/components/organisms';
import { MoreSVG } from '@/components/svg/MoreSVG';
import { useToggleHandler } from '@/hooks/useToggleHandler';
import { MyfeedCardProps } from '@/types/authType';
import Link from 'next/link';

export const CardHoverMsg = ({ data, isOwnProfile }: MyfeedCardProps) => {
  const { handleValue: feedOptionHandler, value: feedOption } =
    useToggleHandler();
  const { closeModal, confirmButton, isModalOpen, openModal } =
    useDeletePostModal();
  return (
    <div className='absolute z-10 flex h-[408px] w-[250px] flex-col justify-between rounded-3xl bg-gray-900 bg-opacity-60 px-[10px] py-[15px] text-white'>
      <div className='relative'>
        {isOwnProfile && (
          <button
            className='absolute right-0 top-0 flex justify-end'
            onClick={feedOptionHandler}
          >
            <MoreSVG />
          </button>
        )}
        {feedOption && <FeedOptionMenu openModal={openModal} />}
      </div>
      <Link href={`/posts/${data.postId}`} className='flex flex-col gap-2'>
        <p className='truncate subTitle-20'>{data.placeName}</p>
        <p className='line-clamp-3 body-16'>{data.content}</p>
        <p className='body-12'>{data.createdAt}</p>
      </Link>
      <Modal
        isOpen={isModalOpen}
        onClose={() => closeModal}
        title={`게시글을 삭제하시겠습니까?`}
        description={`${data.placeName} 게시글을 삭제하시려면 삭제하기 버튼을 눌러주세요.`}
        subButton='취소'
        onMainClick={() => confirmButton(data.postId)}
        onSubClick={closeModal}
        mainButton='삭제하기'
      />
    </div>
  );
};
