import type { Meta, StoryObj } from '@storybook/react';
import PhotographyEditorialCollage from './PhotographyEditorialCollage';

const meta: Meta<typeof PhotographyEditorialCollage> = {
  title: 'Photography Suite/PhotographyEditorialCollage',
  component: PhotographyEditorialCollage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyEditorialCollage>;

export const Default: Story = {
  args: {},
};
