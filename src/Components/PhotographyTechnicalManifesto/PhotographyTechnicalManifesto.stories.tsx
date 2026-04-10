import type { Meta, StoryObj } from '@storybook/react';
import PhotographyTechnicalManifesto from './PhotographyTechnicalManifesto';

const meta: Meta<typeof PhotographyTechnicalManifesto> = {
  title: 'Photography Suite/PhotographyTechnicalManifesto',
  component: PhotographyTechnicalManifesto,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyTechnicalManifesto>;

export const Default: Story = {
  args: {},
};
