import type { Meta, StoryObj } from '@storybook/react';
import LensApertureExhibition from './LensApertureExhibition';

const meta: Meta<typeof LensApertureExhibition> = {
  title: 'Photography Suite/LensApertureExhibition',
  component: LensApertureExhibition,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LensApertureExhibition>;

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
