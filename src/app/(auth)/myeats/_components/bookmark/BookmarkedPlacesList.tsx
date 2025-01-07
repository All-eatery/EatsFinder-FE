'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookmarkedListCard } from './BookmarkedListCard';
import { getBookmarkList } from '@/api/bookmark';
import { BookmarkedLisdtsType } from '@/types/bookmarkType';
import { Button, TextField } from '@/components/atoms';
import { useInfiniteScrollPer3 } from '@/app/(auth)/_hooks/useInfiniteScroll';
import Loading from '@/components/atoms/loading/Loading';
import { convertToURLSearchParams } from '@/utils/convertToURLSearchParams';
import { StickyBox } from '@/components/atoms/stickyBox';
import { Modal } from '@/components/organisms';
import {
  createNewListModal,
  useDeleteListModal,
} from '@/app/(auth)/_hooks/useModal';
import { useHandleCheckBox } from '@/app/(auth)/_hooks/useHandleCheckBox';

export const BookmarkedPlacesList = () => {
  const params = useSearchParams();
  const select = params.get('select');
  const router = useRouter();
  const {
    data,
    status,
    isFetchingNextPage,
    handleLoadMore,
    hasNextPage,
    lastElementRef,
    isLoadMoreMode,
  } = useInfiniteScrollPer3<BookmarkedLisdtsType>({
    queryKey: ['myBookmarks'],
    queryFn: (cursor) => getBookmarkList(cursor),
    getNextPageParam: (lastPage) => lastPage.lastItemId,
  });
  const {
    closeModal: closeDeleteListModal,
    confirmButton: deleteListConfirmButton,
    isModalOpen: isDeleteListModalOpen,
    openModal: openDeleteListModal,
  } = useDeleteListModal();
  const {
    closeModal: closeCreateNewListModal,
    confirmButton: createNewListModalConfirmButton,
    isModalOpen: isCreateNewListModalOpen,
    openModal: openCreateNewListModal,
    handleNewListName,
  } = createNewListModal();
  const handleCardClick = (id: number) => {
    if (select) return;
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.set('list', id.toString());

    const newParams = convertToURLSearchParams({
      searchParams: Object.fromEntries(currentParams),
    });

    router.push(`?${newParams.toString()}`);
  };
  const { checkAllHandler, checkHandler, isChecked } = useHandleCheckBox();

  if (status === 'pending') return <Loading />;
  if (status === 'error') return <div>데이터를 불러오는 중 오류 발생</div>;

  return (
    <div>
      <div>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex} className='flex flex-col gap-4'>
            {page.items.map((item, index) => {
              const isLastItem =
                pageIndex === data.pages.length - 1 &&
                index === page.items.length - 1;

              return (
                <div
                  key={item.id}
                  ref={isLastItem ? lastElementRef : null}
                  onClick={() => {
                    handleCardClick(item.id);
                    checkHandler(item.id);
                  }}
                >
                  <BookmarkedListCard
                    id={item.id}
                    isSelect={!!select}
                    isSeleceted={isChecked.includes(item.id)}
                    title={item.title}
                    count={item.count}
                    thumbnails={item.bookmarkPlaces}
                  />
                </div>
              );
            })}
          </div>
        ))}
        {select ? (
          <StickyBox>
            <Button
              variant={'stroke'}
              onClick={openDeleteListModal}
              className='bg-white'
            >
              선택 삭제
            </Button>
          </StickyBox>
        ) : (
          <StickyBox>
            <Button onClick={openCreateNewListModal}>새 리스트 만들기</Button>
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

      {/* {!hasNextPage && (
        <div className='py-4 text-center'>더 이상 북마크가 없습니다.</div>
      )} */}
      <Modal
        isOpen={isCreateNewListModalOpen}
        onClose={closeCreateNewListModal}
        title='새 리스트 만들기'
        description='새로운 리스트를 추가해 보세요.'
        onMainClick={createNewListModalConfirmButton}
        mainButton='완료'
        subButton='취소'
        onSubClick={closeCreateNewListModal}
      >
        <div className='flex w-full flex-col items-center'>
          <div className='flex w-full justify-center p-10'>
            <TextField
              label='리스트 이름'
              fullWidth
              onChange={(e) => handleNewListName(e)}
            />
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteListModalOpen}
        onClose={closeDeleteListModal}
        title='선택한 리스트들을 삭제할까요?'
        onMainClick={() => deleteListConfirmButton(isChecked)}
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
