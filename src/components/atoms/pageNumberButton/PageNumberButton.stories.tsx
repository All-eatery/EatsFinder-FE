import { Meta, StoryObj } from '@storybook/react';
import { PageNumberButton } from '.';

const meta: Meta<typeof PageNumberButton> = {
  title: 'atom/PageNumberButton',
  component: PageNumberButton,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof PageNumberButton>;

export const Default: Story = {};
