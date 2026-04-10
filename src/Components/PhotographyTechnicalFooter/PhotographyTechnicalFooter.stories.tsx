import type { Meta, StoryObj } from '@storybook/react';
import PhotographyTechnicalFooter from './PhotographyTechnicalFooter';

const meta: Meta<typeof PhotographyTechnicalFooter> = {
  title: 'Photography Suite/PhotographyTechnicalFooter',
  component: PhotographyTechnicalFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyTechnicalFooter>;

export const Default: Story = {
  args: {},
};
