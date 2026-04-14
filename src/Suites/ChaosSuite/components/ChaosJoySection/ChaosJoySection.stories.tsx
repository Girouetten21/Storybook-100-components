import type { Meta, StoryObj } from '@storybook/react';
import { ChaosJoySection } from './ChaosJoySection';

const meta = {
  title: 'Sections/ChaosJoySection',
  component: ChaosJoySection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ChaosJoySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ChaosJoySection />,
};
