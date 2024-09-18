import { Meta, StoryObj } from '@storybook/react';
import { CreatedBy } from '.';

const meta: Meta<typeof CreatedBy> = {
  title: 'atom/CreatedBy',
  component: CreatedBy,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CreatedBy>;

export const Default: Story = {};
