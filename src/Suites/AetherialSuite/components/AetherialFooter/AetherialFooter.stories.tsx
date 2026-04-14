import type { Meta, StoryObj } from '@storybook/react';
import { AetherialFooter } from './AetherialFooter';

const meta: Meta<typeof AetherialFooter> = {
  title: 'AetherialSuite/AetherialFooter',
  component: AetherialFooter,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AetherialFooter>;

export const Default: Story = {};
