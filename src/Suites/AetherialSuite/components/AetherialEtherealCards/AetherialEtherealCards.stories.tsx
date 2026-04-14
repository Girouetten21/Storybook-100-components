import type { Meta, StoryObj } from '@storybook/react';
import { AetherialEtherealCards } from './AetherialEtherealCards';

const meta: Meta<typeof AetherialEtherealCards> = {
  title: 'AetherialSuite/AetherialEtherealCards',
  component: AetherialEtherealCards,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AetherialEtherealCards>;

export const Default: Story = {};
