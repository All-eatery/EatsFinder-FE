import type { Meta, StoryObj } from '@storybook/react';

import { UserCard } from './UserCard';

const meta: Meta<typeof UserCard> = {
  component: UserCard,
  title: 'molecule/UserCard',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {},
};
