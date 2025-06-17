import type { Preview } from '@storybook/react';
import { Pretendard, TossFace } from '../src/assets/fonts';
import '../src/app/globals.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div className={`${Pretendard.variable} ${TossFace.variable}`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
