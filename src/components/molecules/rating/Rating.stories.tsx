import type { Meta, StoryObj } from '@storybook/react';

import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  component: Rating,
  title: 'molecule/Rating',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: { number: 5 },
};
