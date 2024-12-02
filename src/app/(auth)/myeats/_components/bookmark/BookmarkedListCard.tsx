'use client';
import { MoreSVG } from '@/components/svg/MoreSVG';
import Image from 'next/image';
import { BookmarkedListOptionMenu } from './BookmarkedListOptionMenu';
import { useDropdownHandler } from '@/hooks/useDropdownHandler';
import { Modal } from '@/components/organisms';
import {
  useMovePlacesInListModal,
  useListNameEditModal,
  useDeleteListModal,
} from '@/app/(auth)/_hooks/useModal';
import { Checkbox, TextField } from '@/components/atoms';
import { Dispatch, SetStateAction } from 'react';

const ListImg = ({ url }: { url: string }) => {
  return (
    <figure className='relative h-[70px] w-[125px] overflow-hidden rounded-lg'>
      {url ? (
        <Image src={url} alt='리스트 맛집 이미지' fill />
      ) : (
        <div className='h-full w-full bg-gray-200' />
      )}
    </figure>
  );
};
interface BookmarkedListCardProps {
  id: number;
  isSelect: string | null;
  title: string;
  count: number;
  thumbnails: { thumbnailUrl: string }[];
}

export const BookmarkedListCard = ({
  id,
  isSelect,
  title,
  count,
  thumbnails,
}: BookmarkedListCardProps) => {
  const {
    dropdownHanlder: bookmarkedListOptionHandler,
    dropdownRef: optionRef,
    isDropdownOpen: bookmarkedListOption,
  } = useDropdownHandler();
  const {
    closeModal: closeListNameEditModal,
    confirmButton: listNameEditConfirmButton,
    isModalOpen: isListNameEditModalOpen,
    openModal: openListNameEditModal,
  } = useListNameEditModal();
  const {
    closeModal: closeDeleteListModal,
    confirmButton: deleteListConfirmButton,
    isModalOpen: isDeleteListModalOpen,
    openModal: openDeleteListModal,
  } = useDeleteListModal();
  const renderListImages = () => {
    const listThumbnails = Array.isArray(thumbnails) ? thumbnails : [];

    while (listThumbnails.length < 4) {
      listThumbnails.push({ thumbnailUrl: '' });
    }

    return listThumbnails.map((item, index) => (
      <ListImg key={index} url={item.thumbnailUrl} />
    ));
  };
  // const a = () => {
  //   // 클릭시 리스트내로 이동 선택활성화시 버튼 xx
  //   console.log('hi', id);
  // };
  return (
    <div
      className='relative rounded-3xl'
      //   className='relative flex h-[184px] w-full items-center justify-start gap-6 rounded-3xl p-5 outline outline-2 outline-gray-100'
      //  선택 => outline outline-2 outline-gray-100
      //  select => outline outline-2 outline-primary-400

      style={{
        boxShadow:
          '0 4px 10px rgba(0, 0, 0, 0.05), 0 -4px 10px rgba(45, 31, 31, 0.05), -4px 0 10px rgba(0, 0, 0, 0.05), 4px 0 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      {isSelect && (
        <div className='absolute left-6 top-6 z-10'>
          <Checkbox variant='Checkbox_Ver2' />
        </div>
      )}
      <div
        // onClick={a}
        className='flex h-[184px] w-full cursor-pointer items-center justify-start gap-6 p-5'
      >
        <div className='grid h-36 w-[254px] grid-cols-2 grid-rows-2 gap-1'>
          {renderListImages()}
        </div>
        <div>
          <p className='text-gray-800 title-24'>{title}</p>
          <p className='text-gray-400 body-18'>{`${count}개의 게시물`}</p>
        </div>
      </div>
      <div className='absolute right-5 top-5' ref={optionRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            bookmarkedListOptionHandler();
          }}
          disabled={!!isSelect}
        >
          <MoreSVG x={32} y={32} />
        </button>
        {bookmarkedListOption && (
          <BookmarkedListOptionMenu
            deleteButton={openDeleteListModal}
            editButton={openListNameEditModal}
          />
        )}
      </div>
      <Modal
        isOpen={isListNameEditModalOpen}
        onClose={closeListNameEditModal}
        title='리스트명 수정'
        description='리스트 이름을 수정하고 관리해 보세요.'
        onMainClick={listNameEditConfirmButton}
        mainButton='완료'
      >
        <div className='flex w-full flex-col items-center'>
          <div className='flex w-full justify-center p-10'>
            <TextField label='리스트 이름' fullWidth defaultValue={title} />
          </div>
          <button className='m-1 text-gray-400 subTitle-18'>리스트 삭제</button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteListModalOpen}
        onClose={closeDeleteListModal}
        title='[리스트이름]를 삭제할까요?'
        onMainClick={() => deleteListConfirmButton(id)}
        subButton='취소'
        onSubClick={closeDeleteListModal}
        mainButton='삭제'
      >
        <div className='flex flex-col items-center text-gray-900 body-18'>
          <span>선택한 맛집이 영구적으로 삭제돼요.</span>
          <span>계속 할까요?</span>
        </div>
      </Modal>
    </div>
  );
};
