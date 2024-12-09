'use client';
import { useSearchParams } from 'next/navigation';
import { BookmarkedPlaceCard } from './BookmarkedPlaceCard';
import { Button } from '@/components/atoms';
import { Modal } from '@/components/organisms';
import {
  useDeletePlacesInListModal,
  useMovePlacesInListModal,
} from '@/app/(auth)/_hooks/useModal';
import { useInfiniteScrollPer3 } from '@/app/(auth)/_hooks/useInfiniteScroll';
import { BookmarkedLisdtsType, ListInPlacesType } from '@/types/bookmarkType';
import { getBookmarkList, getBookmarkPlaces } from '@/api/bookmark';
import Loading from '@/components/atoms/loading/Loading';
import Link from 'next/link';
import { useHandleCheckBox } from '@/app/(auth)/_hooks/useHandleCheckBox';
import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { BookmarkModalCard } from '@/components/molecules/bookmarkButton/BookmarkButton';
import { StickyBox } from '@/components/atoms/stickyBox';

export const ListInBookmarkedPlaces = () => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');
  const id = searchParams.get('list');
  const listId = parseInt(id!);
  const {
    closeModal: closeMoveModal,
    confirmButton: moveConfirmButton,
    isModalOpen: isMoveModalOpen,
    openModal: openEditModal,
  } = useMovePlacesInListModal();
  const {
    closeModal: closeDeleteModal,
    confirmButton: deleteConfirmButton,
    isModalOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
  } = useDeletePlacesInListModal();
  const {
    data,
    status,
    isFetchingNextPage,
    handleLoadMore,
    hasNextPage,
    lastElementRef,
    isLoadMoreMode,
  } = useInfiniteScrollPer3<ListInPlacesType>({
    queryKey: ['bookmarkedInPlaces', String(listId)],
    queryFn: (cursor) => getBookmarkPlaces(listId, cursor),
    getNextPageParam: (lastPage) => lastPage.lastItemId,
  });
  const { checkAllHandler, checkHandler, isChecked } = useHandleCheckBox();
  const { checkHandler: modalChekcer, isChecked: modalIsChecked } =
    useHandleCheckBox();
  console.log(isChecked);
  const {
    data: modalData,
    fetchNextPage,
    hasNextPage: modalHasNextPage,
    isFetchingNextPage: modalIsFetchingNextPage,
  } = useInfiniteQuery<BookmarkedLisdtsType>({
    queryKey: ['bookmarkModal'],
    queryFn: ({ pageParam = 0 }) => getBookmarkList(pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.items.length > 0 ? lastPage.lastItemId : undefined;
    },
    enabled: isMoveModalOpen,
  });
  if (status === 'pending') return <Loading />;
  if (status === 'error') return <div>데이터를 불러오는 중 오류 발생</div>;

  return (
    <div>
      <div className='relative'>
        <div
          className={`${select && 'max-h-[calc(100vh-120px)] overflow-y-auto'} flex flex-col gap-9`}
        >
          {data?.pages?.map((page, pageIndex) => (
            <div key={pageIndex} className='flex flex-col gap-4'>
              {page.items?.map((item, index) => {
                console.log(item.places.id, item.places.name);
                const isLastItem =
                  pageIndex === data.pages.length - 1 &&
                  index === page.items.length - 1;

                return select ? (
                  <div
                    key={item.id}
                    ref={isLastItem ? lastElementRef : null}
                    onClick={() => checkHandler(item.places.id)}
                    className={`cursor-pointer rounded-3xl border-2 ${
                      isChecked.includes(item.places.id)
                        ? 'border-primary-100'
                        : 'border-gray-100'
                    }`}
                  >
                    <BookmarkedPlaceCard
                      select={!!select}
                      isSeleceted={isChecked.includes(item.places.id)}
                      category={item.places.depth2}
                      id={item.places.id}
                      name={item.places.name}
                      src={item.places.thumbnailUrl}
                      address={item.places.roadAddress}
                    />
                  </div>
                ) : (
                  <Link
                    href={`/posts/${id}`}
                    key={item.id}
                    ref={isLastItem ? lastElementRef : null}
                    className='border-2 border-transparent'
                  >
                    <BookmarkedPlaceCard
                      category={item.places.depth2}
                      id={item.places.id}
                      name={item.places.name}
                      src={item.places.thumbnailUrl}
                      address={item.places.roadAddress}
                    />
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* {!hasNextPage && (
        <div className='py-4 text-center'>더 이상 북마크가 없습니다.</div>
      )} */}
        {select && (
          <StickyBox>
            <Button
              variant={'stroke'}
              size={'small'}
              onClick={() => openEditModal()}
              className='bg-white'
            >
              이동
            </Button>
            <Button
              variant={'stroke'}
              size={'small'}
              onClick={openDeleteModal}
              className='bg-white'
            >
              삭제
            </Button>
          </StickyBox>
        )}
      </div>
      {isLoadMoreMode && hasNextPage && (
        <div className='mt-7 flex justify-center'>
          <Button onClick={handleLoadMore} variant={'stroke'}>
            더보기
          </Button>
        </div>
      )}

      {isFetchingNextPage && <Loading />}

      <Modal
        isOpen={isMoveModalOpen}
        onClose={closeMoveModal}
        title='다른 리스트로 이동'
        description='이동할 리스트를 선택해주세요.'
        onMainClick={() =>
          moveConfirmButton({
            places: isChecked,
            lists: modalIsChecked,
            id: listId,
          })
        }
        mainButton='적용'
        size={'medium'}
      >
        <div className='flex flex-col items-center gap-10 px-10 pb-10'>
          <div
            className='flex max-h-[400px] w-full flex-col gap-5 overflow-y-auto px-2 py-2 scrollbar-hide'
            ref={
              modalData?.pages[modalData.pages.length - 1]?.items.length
                ? (el) => {
                    if (el && modalHasNextPage && !modalIsFetchingNextPage) {
                      const observer = new IntersectionObserver(
                        (entries) => {
                          if (entries[0].isIntersecting) {
                            fetchNextPage();
                          }
                        },
                        { threshold: 0.1 },
                      );
                      observer.observe(el);
                      return () => observer.disconnect();
                    }
                  }
                : undefined
            }
          >
            {modalData?.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.items.map((list) => (
                  <BookmarkModalCard
                    key={list.id}
                    onClick={(id) => modalChekcer(id)}
                    selectedLists={modalIsChecked}
                    id={list.id}
                    count={list.count}
                    title={list.title}
                  />
                ))}
              </React.Fragment>
            ))}
            {modalIsFetchingNextPage && <Loading />}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title='다른 리스트로 이동'
        onMainClick={() =>
          deleteConfirmButton({ places: isChecked, listId: listId })
        }
        mainButton='적용'
        subButton='취소'
      >
        <div className='flex flex-col items-center justify-center text-gray-900 body-18'>
          <p>선택한 맛집들이 영구적으로 삭제돼요.</p>
          <p>계속 삭제할까요?</p>
        </div>
      </Modal>
    </div>
  );
};
