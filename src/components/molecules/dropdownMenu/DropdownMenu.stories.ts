import { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'molecules/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {};
