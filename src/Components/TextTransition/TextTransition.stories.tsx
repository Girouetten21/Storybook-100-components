import type { Meta, StoryObj } from '@storybook/react';
import { TextTransition } from './TextTransition';

const meta = {
    title: 'Components/TextTransition',
    component: TextTransition,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof TextTransition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
