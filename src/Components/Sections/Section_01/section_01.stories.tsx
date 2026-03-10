import type { Meta, StoryObj } from '@storybook/react';
import { Section_01 } from './section_01';

const meta = {
    title: 'Sections/Section_01',
    component: Section_01,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Section_01>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
