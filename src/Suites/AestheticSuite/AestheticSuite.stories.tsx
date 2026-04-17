import type { Meta, StoryObj } from '@storybook/react';
import { AestheticSuite } from './AestheticSuite';

const meta: Meta<typeof AestheticSuite> = {
  title: 'Suites/AestheticSuite',
  component: AestheticSuite,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AestheticSuite>;

export const Default: Story = {};
