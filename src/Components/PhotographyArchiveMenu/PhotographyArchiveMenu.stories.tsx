import type { Meta, StoryObj } from '@storybook/react';
import PhotographyArchiveMenu from './PhotographyArchiveMenu';

const meta: Meta<typeof PhotographyArchiveMenu> = {
  title: 'Photography Suite/PhotographyArchiveMenu',
  component: PhotographyArchiveMenu,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyArchiveMenu>;

export const Default: Story = {
  args: {},
};
