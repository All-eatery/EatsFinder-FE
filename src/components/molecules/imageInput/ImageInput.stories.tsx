import type { Meta, StoryObj } from '@storybook/react';

import { ImageInput } from './ImageInput';

const meta: Meta<typeof ImageInput> = {
  component: ImageInput,
  title: 'molecule/ImageInput',
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ImageInput>;

export const Default: Story = {
  args: {},
};

export const Expand: Story = {
  args: {
    expand: true,
  },
};
