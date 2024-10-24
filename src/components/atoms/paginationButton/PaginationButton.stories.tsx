import { Meta, StoryObj } from '@storybook/react';
import { PaginationButton } from '.';

const meta: Meta<typeof PaginationButton> = {
  title: 'atom/PaginationButton',
  component: PaginationButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof PaginationButton>;

export const Default: Story = {};
