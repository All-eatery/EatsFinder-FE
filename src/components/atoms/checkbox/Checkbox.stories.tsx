import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'atom/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
