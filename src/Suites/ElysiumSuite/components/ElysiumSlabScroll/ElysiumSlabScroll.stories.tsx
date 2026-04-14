import type { Meta, StoryObj } from '@storybook/react';
import { ElysiumSlabScroll } from './ElysiumSlabScroll';

const meta = {
  title: 'Scroll/ElysiumSlabScroll',
  component: ElysiumSlabScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ElysiumSlabScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ElysiumSlabScroll />,
};
