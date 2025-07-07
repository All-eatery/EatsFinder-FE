import type { Meta, StoryObj } from '@storybook/react';

import { Point } from './Point';

const meta: Meta<typeof Point> = {
  component: Point,
  title: 'atom/Point',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Point>;

export const Default: Story = {
  args: {},
};
