'use client';
import { useBookmarkModal } from '@/app/(auth)/_hooks/useModal';
import { Button, Checkbox, TextField } from '@/components/atoms';
import { Modal } from '@/components/organisms';
import { AddSVG } from '@/components/svg/AddSVG';
import React, { useEffect, useState } from 'react';

const BookmarkModalCard = () => {
  const [isSelected, setIsSelected] = useState(false);
  const handleCard = () => {
    setIsSelected(!isSelected);
  };
  return (
    <button
      onClick={handleCard}
      className={`flex items-center justify-start gap-3 rounded-3xl border-2 px-5 py-6 ${isSelected ? 'border-primary-400' : 'border-transparent'}`}
      style={{
        boxShadow:
          '0 4px 10px rgba(0, 0, 0, 0.05), 0 -4px 10px rgba(45, 31, 31, 0.05), -4px 0 10px rgba(0, 0, 0, 0.05), 4px 0 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Checkbox variant='Checkbox_Ver2' checked={isSelected} />
      <div className='flex flex-col'>
        <p className='text-gray-800 title-24'>기본 리스트</p>
        <p className='text-gray-400 body-18'>4개의 게시물</p>
      </div>
    </button>
  );
};

export const BookmarkButton = () => {
  const [active, setIsActive] = useState(false);
  const [color, setColor] = useState('#0D0D0D');
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    if (newListName) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [newListName]);
  useEffect(() => {
    if (!active) {
      setColor('#D9D9D9');
    } else {
      setColor('#0D0D0D');
    }
  }, [active]);
  const { closeModal, confirmButton, isModalOpen, openModal } =
    useBookmarkModal();
  //form에서 관리될 목록
  //맛집id 리스트배열
  //리스트만들기 => 리스트명

  const handleNewListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };
  const makeNewList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newListName);
    setNewListName('');
  };

  return (
    <>
      <Checkbox variant='bookmark' onClick={openModal} />
      <Modal
        isOpen={isModalOpen}
        mainButton='확인'
        title='리스트에 추가하기'
        description='리스트를 만들고, 나만의 맛집지도를 완성해 보세요'
        onClose={closeModal}
        onMainClick={confirmButton}
        size={'medium'}
      >
        <div className='flex flex-col items-center gap-10 px-10 pb-10'>
          <form className='flex items-center' onSubmit={(e) => makeNewList(e)}>
            <TextField
              placeholder='리스트명을 적어주세요.'
              className='w-[330px]'
              value={newListName}
              onChange={(e) => handleNewListName(e)}
            />
            <Button
              onMouseDown={() => setColor('white')}
              onMouseUp={() => setColor('#0D0D0D')}
              className='h-12'
              variant={'dash'}
              size={'small'}
              disabled={!active}
            >
              <div className='flex items-center gap-1'>
                <AddSVG color={color} />
                <span>리스트 만들기</span>
              </div>
            </Button>
          </form>
          <div className='flex max-h-[400px] w-full flex-col gap-5 overflow-y-auto px-2 py-2 scrollbar-hide'>
            <BookmarkModalCard />
            <BookmarkModalCard />
            <BookmarkModalCard />
            <BookmarkModalCard />
            <BookmarkModalCard />
            <BookmarkModalCard />
          </div>
        </div>
      </Modal>
    </>
  );
};
