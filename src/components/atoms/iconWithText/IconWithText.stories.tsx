import { Meta, StoryObj } from '@storybook/react';
import { IconWithText } from '.';

const meta: Meta<typeof IconWithText> = {
  title: 'atom/IconWithText',
  component: IconWithText,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof IconWithText>;

export const Default: Story = {};
