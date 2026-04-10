import type { Meta, StoryObj } from '@storybook/react';
import PhotographyPerspectiveGrid from './PhotographyPerspectiveGrid';

const meta: Meta<typeof PhotographyPerspectiveGrid> = {
  title: 'Photography Suite/PhotographyPerspectiveGrid',
  component: PhotographyPerspectiveGrid,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyPerspectiveGrid>;

export const Default: Story = {
  args: {},
};
