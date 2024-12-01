'use client';
import {
  addBookmarkPlaces,
  createNewBookmarkList,
  getBookmarkList,
} from '@/api/bookmark';
import { useBookmarkModal } from '@/app/(auth)/_hooks/useModal';
import { Button, Checkbox, TextField } from '@/components/atoms';
import { Modal } from '@/components/organisms';
import { AddSVG } from '@/components/svg/AddSVG';
import { BookmarkedLisdtsType } from '@/types/bookmarkType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { ComponentProps, useEffect, useState } from 'react';
type BookmarkModalCardProps = {
  id: number;
  title: string;
  count: number;
  onClick?: (id: number) => void;
  selectedLists: number[];
};

const BookmarkModalCard = ({
  id,
  title,
  count,
  onClick,
  selectedLists,
}: BookmarkModalCardProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleCard = () => {
    onClick!(id);
  };
  return (
    <button
      onClick={handleCard}
      key={id}
      className={`flex items-center justify-start gap-3 rounded-3xl border-2 px-5 py-6 ${isSelected ? 'border-primary-400' : 'border-transparent'}`}
      style={{
        boxShadow:
          '0 4px 10px rgba(0, 0, 0, 0.05), 0 -4px 10px rgba(45, 31, 31, 0.05), -4px 0 10px rgba(0, 0, 0, 0.05), 4px 0 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Checkbox variant='Checkbox_Ver2' checked={selectedLists.includes(id)} />
      <div className='flex flex-col'>
        <p className='flex text-gray-800 title-24'>{title}</p>
        <p className='flex text-gray-400 body-18'>{`${count}개의 게시물`}</p>
      </div>
    </button>
  );
};

export const BookmarkButton = ({ placeId }: { placeId: number }) => {
  const [active, setIsActive] = useState(false);
  const [color, setColor] = useState('#0D0D0D');
  const [newListName, setNewListName] = useState('');
  const [selectedLists, setSelectedLists] = useState<number[]>([]);
  const queryClient = useQueryClient();
  //북마크 모달 내부에서 삭제도 되야하는가?
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
  const { closeModal, isModalOpen, openModal } = useBookmarkModal();

  const mutationAddBookmark = useMutation({
    mutationFn: ({
      id,
      selectedLists,
    }: {
      id: number;
      selectedLists: number[];
    }) => addBookmarkPlaces(id, selectedLists),
    onError: (error) => {
      console.error('북마크 추가 에러', error);
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ['bookmarkList'] });
      closeModal();
      setSelectedLists([]);
      console.log('북마크 추가 및 모달 닫기 => 알림');
    },
  });
  const mutationCreateNewList = useMutation({
    mutationFn: (newListName: string) => createNewBookmarkList(newListName),
    onError: (error) => {
      console.error('북마크 생성 에러', error);
    },
    onSettled: () => {
      console.log('북마크 생성성공!', isModalOpen);
      queryClient.refetchQueries({ queryKey: ['bookmarkList'] });
    },
  });
  const handleNewListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };
  const makeNewList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutationCreateNewList.mutate(newListName);
    setNewListName('');
  };
  const selectLists = (id: number) => {
    if (selectedLists.includes(id)) {
      setSelectedLists(selectedLists.filter((listId) => listId !== id)); // 선택 해제
    } else {
      setSelectedLists([...selectedLists, id]);
    }
  };

  const { data } = useQuery<BookmarkedLisdtsType>({
    queryKey: ['bookmarkList'],
    queryFn: () => getBookmarkList(1),
    enabled: isModalOpen,
  });

  const addPlaces = async () => {
    mutationAddBookmark.mutate({ id: placeId, selectedLists });
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
        onMainClick={addPlaces}
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
            {data?.items.map((list) => (
              <BookmarkModalCard
                onClick={(id) => selectLists(id)}
                selectedLists={selectedLists}
                id={list.id}
                count={list.count}
                title={list.title}
              />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};
