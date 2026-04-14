import type { Meta, StoryObj } from '@storybook/react';
import { KineticImpactSection } from './KineticImpactSection';

const meta = {
  title: 'Sections/KineticImpactSection',
  component: KineticImpactSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof KineticImpactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <KineticImpactSection />,
};
