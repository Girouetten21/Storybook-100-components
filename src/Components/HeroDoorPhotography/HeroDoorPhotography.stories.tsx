import type { Meta, StoryObj } from '@storybook/react';
import HeroDoorPhotography from './HeroDoorPhotography';

const meta: Meta<typeof HeroDoorPhotography> = {
  title: 'Photography Suite/HeroDoorPhotography',
  component: HeroDoorPhotography,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeroDoorPhotography>;

export const Default: Story = {
  args: {
    onUnlock: () => console.log('Suite Unlocked!'),
  },
};
