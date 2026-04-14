import type { Meta, StoryObj } from '@storybook/react';
import PhotographyContactBanner from './PhotographyContactBanner';

const meta: Meta<typeof PhotographyContactBanner> = {
  title: 'Photography Suite/PhotographyContactBanner',
  component: PhotographyContactBanner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyContactBanner>;

export const Default: Story = {
  args: {},
};
