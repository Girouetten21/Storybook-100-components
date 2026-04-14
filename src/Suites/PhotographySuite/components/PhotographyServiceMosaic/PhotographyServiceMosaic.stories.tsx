import type { Meta, StoryObj } from '@storybook/react';
import PhotographyServiceMosaic from './PhotographyServiceMosaic';

const meta: Meta<typeof PhotographyServiceMosaic> = {
  title: 'Photography Suite/PhotographyServiceMosaic',
  component: PhotographyServiceMosaic,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PhotographyServiceMosaic>;

export const Default: Story = {
  args: {},
};
