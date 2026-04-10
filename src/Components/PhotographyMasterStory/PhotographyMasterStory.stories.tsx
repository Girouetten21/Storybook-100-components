import type { Meta, StoryObj } from '@storybook/react';
import PhotographyMasterStory from './PhotographyMasterStory';

const meta: Meta<typeof PhotographyMasterStory> = {
  title: 'Photography Suite/PhotographyMasterStory',
  component: PhotographyMasterStory,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyMasterStory>;

export const Default: Story = {
  args: {},
};
