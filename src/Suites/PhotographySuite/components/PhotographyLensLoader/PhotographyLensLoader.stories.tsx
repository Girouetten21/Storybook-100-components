import type { Meta, StoryObj } from '@storybook/react';
import PhotographyLensLoader from './PhotographyLensLoader';

const meta: Meta<typeof PhotographyLensLoader> = {
  title: 'Photography Suite/PhotographyLensLoader',
  component: PhotographyLensLoader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyLensLoader>;

export const Default: Story = {
  args: {
    onComplete: () => alert('Loading Complete! Shutter Open.'),
  },
};
