import { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '.';

const meta: Meta<typeof Pagination> = {
  title: 'molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {};
