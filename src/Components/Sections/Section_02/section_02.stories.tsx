import type { Meta, StoryObj } from '@storybook/react';
import { Section_02 } from './section_02';

const meta = {
    title: 'Sections/Section_02',
    component: Section_02,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Section_02>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
