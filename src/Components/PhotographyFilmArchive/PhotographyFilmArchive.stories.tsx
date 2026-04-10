import type { Meta, StoryObj } from '@storybook/react';
import PhotographyFilmArchive from './PhotographyFilmArchive';

const meta: Meta<typeof PhotographyFilmArchive> = {
  title: 'Photography Suite/PhotographyFilmArchive',
  component: PhotographyFilmArchive,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyFilmArchive>;

export const Default: Story = {
  args: {},
};
