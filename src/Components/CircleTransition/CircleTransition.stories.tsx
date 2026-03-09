import type { Meta, StoryObj } from '@storybook/react';
import { CircleTransition } from './CircleTransition';

const meta = {
    title: 'Components/CircleTransition',
    component: CircleTransition,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CircleTransition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
