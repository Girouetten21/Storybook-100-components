import type { Meta, StoryObj } from '@storybook/react';
import { ShatterSection01 } from './shatter-section01';

const meta = {
    title: 'Sections/ShatterSection01',
    component: ShatterSection01,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ShatterSection01>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
