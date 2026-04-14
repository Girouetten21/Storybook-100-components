import type { Meta, StoryObj } from '@storybook/react';
import PhotographyHeroDoor from './PhotographyHeroDoor';

const meta: Meta<typeof PhotographyHeroDoor> = {
  title: 'Photography Suite/PhotographyHeroDoor',
  component: PhotographyHeroDoor,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyHeroDoor>;

export const Default: Story = {
  args: {
    onUnlock: () => console.log('Suite Unlocked!'),
  },
};
