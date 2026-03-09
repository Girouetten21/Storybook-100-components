import type { Meta, StoryObj } from '@storybook/react';
import { RandomRectangles } from './RandomRectangles';

const meta = {
    title: 'Components/RandomRectangles',
    component: RandomRectangles,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof RandomRectangles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
    decorators: [
        (Story) => (
            <div style={{ height: '300vh', background: '#0a0a0c' }}>
                <Story />
            </div>
        ),
    ],
};
