import type { Meta, StoryObj } from '@storybook/react';
import { AetherialZenithCTA } from './AetherialZenithCTA';

const meta: Meta<typeof AetherialZenithCTA> = {
  title: 'AetherialSuite/AetherialZenithCTA',
  component: AetherialZenithCTA,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AetherialZenithCTA>;

export const Default: Story = {};
