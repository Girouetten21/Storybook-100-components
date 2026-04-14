import type { Meta, StoryObj } from '@storybook/react';
import { PaperPoetrySection } from './PaperPoetrySection';

const meta = {
  title: 'Sections/PaperPoetrySection',
  component: PaperPoetrySection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof PaperPoetrySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PaperPoetrySection />,
};
