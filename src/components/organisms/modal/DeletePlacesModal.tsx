import { Modal } from '.';
import { useDeletePlacesModal } from '@/app/(auth)/_hooks/useModal';
type DeletePlacesModalProps = {
  places: number[];
  listId: number;
};
export const DeletePlacesModal = ({
  listId,
  places,
}: DeletePlacesModalProps) => {
  const {
    closeModal: closeDeleteModal,
    confirmButton: deleteConfirmButton,
    isModalOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
  } = useDeletePlacesModal();
  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={closeDeleteModal}
      title='이 맛집들을 삭제할까요?'
      onMainClick={() => deleteConfirmButton({ places, listId })}
      onSubClick={closeDeleteModal}
      mainButton='적용'
      subButton='취소'
    >
      <div className='flex flex-col items-center justify-center text-gray-900 body-18'>
        <p>선택한 맛집들이 영구적으로 삭제돼요.</p>
        <p>계속 삭제할까요?</p>
      </div>
    </Modal>
  );
};
