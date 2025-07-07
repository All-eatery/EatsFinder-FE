import type { Meta, StoryObj } from '@storybook/react';

import { SkeletonFeedCard } from './SkeletonFeedCard';

const meta: Meta<typeof SkeletonFeedCard> = {
  component: SkeletonFeedCard,
  title: 'SkeletonFeedCard',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SkeletonFeedCard>;

export const Default: Story = {
  args: {},
};
