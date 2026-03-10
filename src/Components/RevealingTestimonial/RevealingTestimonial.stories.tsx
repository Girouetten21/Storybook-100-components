import type { Meta, StoryObj } from '@storybook/react';
import { RevealingTestimonial } from './RevealingTestimonial';

const meta = {
    title: 'Components/RevealingTestimonial',
    component: RevealingTestimonial,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RevealingTestimonial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
