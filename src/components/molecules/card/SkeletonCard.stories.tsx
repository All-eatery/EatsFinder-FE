import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonCard } from './SkeletonCard';

const meta: Meta<typeof SkeletonCard> = {
  component: SkeletonCard,
  title: 'SkeletonCard',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SkeletonCard>;

export const Default: Story = {
  args: {},
};
