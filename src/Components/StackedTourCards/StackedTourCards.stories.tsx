import type { Meta, StoryObj } from '@storybook/react';
import { StackedTourCards } from './StackedTourCards';
import { Section_01 } from '../Sections/Section_01/section_01';
import { Section_02 } from '../Sections/Section_02/section_02';

const meta = {
    title: 'Components/StackedTourCards',
    component: StackedTourCards,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof StackedTourCards>;

export default meta;
type Story = StoryObj<typeof meta>;

// The default story with just the component itself
export const Default: Story = {
    args: {},
};

// Story demonstrating the scroll effect with preceding and succeeding sections
export const WithScrollTesting: Story = {
    render: () => (
        <div style={{ margin: 0, padding: 0 }}>
            <Section_01 />
            <StackedTourCards />
            <Section_02 />
        </div>
    ),
};
