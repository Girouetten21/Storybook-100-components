import type { Meta, StoryObj } from '@storybook/react';
import { WhisperingPoetrySection } from './WhisperingPoetrySection';

const meta = {
  title: 'Sections/WhisperingPoetrySection',
  component: WhisperingPoetrySection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof WhisperingPoetrySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <WhisperingPoetrySection />,
};
