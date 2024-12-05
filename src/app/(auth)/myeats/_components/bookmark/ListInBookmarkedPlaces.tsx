'use client';
import { useSearchParams } from 'next/navigation';
import { BookmarkedPlaceCard } from './BookmarkedPlaceCard';
import { Button } from '@/components/atoms';
import { Modal } from '@/components/organisms';
import {
  useDeletePlacesInListModal,
  useMovePlacesInListModal,
} from '@/app/(auth)/_hooks/useModal';
import { EditListBox } from './EditListBox';
import { useInfiniteScrollPer3 } from '@/app/(auth)/_hooks/useInfiniteScroll';
import { ListInPlacesType } from '@/types/bookmarkType';
import { getBookmarkPlaces } from '@/api/bookmark';
import Loading from '@/components/atoms/loading/Loading';

export const ListInBookmarkedPlaces = () => {
  const searchParams = useSearchParams();
  const select = searchParams.get('select');
  const id = searchParams.get('list');
  console.log('select', select);

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
    queryKey: ['bookmarkedInPlaces', id!],
    queryFn: (cursor) => getBookmarkPlaces(Number(id), cursor),
    getNextPageParam: (lastPage) => lastPage.lastItemId,
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
                const isLastItem =
                  pageIndex === data.pages.length - 1 &&
                  index === page.items.length - 1;

                return (
                  <div key={item.id} ref={isLastItem ? lastElementRef : null}>
                    <BookmarkedPlaceCard
                      category={item.places.depth2}
                      id={item.places.id}
                      name={item.places.name}
                      src={item.places.thumbnailUrl}
                      address={item.places.roadAddress}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* {!hasNextPage && (
        <div className='py-4 text-center'>더 이상 북마크가 없습니다.</div>
      )} */}
        {select && (
          // <div className='z-10 my-[60px] flex justify-center gap-3'>

          // <div className='absolute bottom-4 left-1/2 z-10 my-[60px] flex -translate-x-1/2 transform justify-center gap-3'>
          <div className='sticky bottom-8 left-0 right-0 z-10 flex justify-center gap-3'>
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
          </div>
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
        onMainClick={moveConfirmButton}
        mainButton='적용'
      >
        <div className='flex max-h-[500px] w-full flex-col items-center gap-5 overflow-y-auto pt-1 scrollbar-hide'>
          <EditListBox />
          <EditListBox />
          <EditListBox />
          <EditListBox />
          <EditListBox />
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title='다른 리스트로 이동'
        onMainClick={deleteConfirmButton}
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
