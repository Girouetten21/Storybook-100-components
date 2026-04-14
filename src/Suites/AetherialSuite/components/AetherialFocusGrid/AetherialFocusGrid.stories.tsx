import type { Meta, StoryObj } from '@storybook/react';
import { AetherialFocusGrid } from './AetherialFocusGrid';

const meta: Meta<typeof AetherialFocusGrid> = {
  title: 'AetherialSuite/AetherialFocusGrid',
  component: AetherialFocusGrid,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AetherialFocusGrid>;

export const Default: Story = {};
