import type { Meta, StoryObj } from '@storybook/react';
import { ShatterSection02 } from './shatter-section02';

const meta = {
    title: 'Sections/ShatterSection02',
    component: ShatterSection02,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ShatterSection02>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
