import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '@/components/atoms';
import { useToggleHandler } from '@/hooks/useToggleHandler';

const ModalStory = () => {
  const { value: isOpen, handleValue: handleModalOpen } = useToggleHandler();
  return (
    <>
      <Button onClick={handleModalOpen}>열기</Button>
      <Modal
        title='전체 메뉴'
        isOpen={isOpen}
        mainButton='확인'
        onClose={handleModalOpen}
        onMainClick={handleModalOpen}
      ></Modal>
    </>
  );
};

const meta: Meta<typeof Modal> = {
  component: ModalStory,
  title: 'organism/Modal',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {};
