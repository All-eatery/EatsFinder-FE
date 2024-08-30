import { Meta, StoryObj } from '@storybook/react';
import { IconWithText } from './iconWithText';

const meta: Meta<typeof IconWithText> = {
  title: 'atom/TextField',
  component: IconWithText,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof IconWithText>;

export const Default: Story = {};
