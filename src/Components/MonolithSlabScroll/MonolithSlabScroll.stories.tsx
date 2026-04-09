import type { Meta, StoryObj } from '@storybook/react';
import { MonolithSlabScroll } from './MonolithSlabScroll';

const meta = {
  title: 'Scroll/MonolithSlabScroll',
  component: MonolithSlabScroll,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof MonolithSlabScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <MonolithSlabScroll />,
};
