import { Meta, StoryObj } from '@storybook/react';
import { CreatedAt } from '.';

const meta: Meta<typeof CreatedAt> = {
  title: 'atom/CreatedAt',
  component: CreatedAt,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CreatedAt>;

export const Default: Story = {};
