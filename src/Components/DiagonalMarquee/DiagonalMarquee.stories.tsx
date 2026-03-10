import type { Meta, StoryObj } from '@storybook/react';
import { DiagonalMarquee } from './DiagonalMarquee';
import { Section_01 } from '../Sections/Section_01/section_01';
import { Section_02 } from '../Sections/Section_02/section_02';

const meta = {
    title: 'Components/DiagonalMarquee',
    component: DiagonalMarquee,
    parameters: {
        layout: 'fullscreen', // Ensure the component takes full width without storybook padding
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DiagonalMarquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithRealSectionsTesting: Story = {
    render: () => (
        <div style={{ margin: 0, padding: 0 }}>
            <Section_01 />
            <DiagonalMarquee />
            <Section_02 />
        </div>
    ),
};
