import type { Meta, StoryObj } from '@storybook/react';
import { AetherialTextMatrix } from './AetherialTextMatrix';

const meta: Meta<typeof AetherialTextMatrix> = {
  title: 'AetherialSuite/AetherialTextMatrix',
  component: AetherialTextMatrix,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AetherialTextMatrix>;

export const Default: Story = {};
