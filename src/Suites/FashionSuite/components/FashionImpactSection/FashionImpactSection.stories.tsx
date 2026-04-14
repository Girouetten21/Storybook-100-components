import type { Meta, StoryObj } from '@storybook/react';
import { FashionImpactSection } from './FashionImpactSection';

const meta = {
  title: 'Sections/FashionImpactSection',
  component: FashionImpactSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FashionImpactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FashionImpactSection />,
};
