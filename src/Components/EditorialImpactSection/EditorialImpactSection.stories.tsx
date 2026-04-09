import type { Meta, StoryObj } from '@storybook/react';
import { EditorialImpactSection } from './EditorialImpactSection';

const meta = {
  title: 'Sections/EditorialImpactSection',
  component: EditorialImpactSection,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof EditorialImpactSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EditorialImpactSection />,
};
