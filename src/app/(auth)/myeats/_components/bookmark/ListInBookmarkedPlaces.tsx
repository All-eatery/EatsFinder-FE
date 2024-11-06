'use client';
import { useSearchParams } from 'next/navigation';
import { BookmarkedPlaceCard } from './BookmarkedPlaceCard';
import { sampleImg } from '@/app/(auth)/profile/[userId]/_components/FollowList';
import { Button, Checkbox } from '@/components/atoms';
import { Modal } from '@/components/organisms';
import { useListEditModal } from '@/app/(auth)/_hooks/useModal';
import { EditListBox } from './EditListBox';

export const ListInBookmarkedPlaces = () => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');
  const url = sampleImg;
  console.log('select', select);
  const {
    closeModal: closeListEditModal,
    confirmButton: listEditConfirmButton,
    isModalOpen: isListEditModalOpen,
    openModal: listEditModalOpen,
  } = useListEditModal();
  return (
    <div>
      <div
        className={`${select && 'max-h-[calc(100vh-120px)] overflow-y-auto'} flex flex-col gap-9`}
      >
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
        <BookmarkedPlaceCard src={url} />
      </div>
      {select && (
        <div className='my-[60px] flex justify-center gap-3'>
          <Button variant={'stroke'} size={'small'} onClick={listEditModalOpen}>
            이동
          </Button>
          <Button variant={'stroke'} size={'small'}>
            삭제
          </Button>
        </div>
      )}
      <Modal
        isOpen={isListEditModalOpen}
        onClose={closeListEditModal}
        title='다른 리스트로 이동'
        description='이동할 리스트를 선택해주세요.'
        onMainClick={listEditConfirmButton}
        mainButton='적용'
      >
        <div className='flex max-h-[500px] w-full flex-col items-center gap-5 overflow-y-auto pt-1 scrollbar-hide'>
          {/* <div className='scrollbar-hide mb-[40px] flex max-h-[380px] w-full flex-col gap-3 overflow-y-auto px-[20px]'> */}

          <EditListBox />
          <EditListBox />
          <EditListBox />
          <EditListBox />
          <EditListBox />
        </div>
      </Modal>
    </div>
  );
};
