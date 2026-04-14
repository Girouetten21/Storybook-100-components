import type { Meta, StoryObj } from '@storybook/react';
import PhotographyExhibition from './PhotographyExhibition';

const meta: Meta<typeof PhotographyExhibition> = {
  title: 'Photography Suite/PhotographyExhibition',
  component: PhotographyExhibition,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyExhibition>;

export const Unlocked: Story = {
  args: {
    isUnlocked: true,
  },
};

export const Locked: Story = {
  args: {
    isUnlocked: false,
  },
};
