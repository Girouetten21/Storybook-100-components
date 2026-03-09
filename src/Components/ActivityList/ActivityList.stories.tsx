import type { Meta, StoryObj } from '@storybook/react';
import { ActivityList } from './ActivityList';

const meta = {
    title: 'Components/ActivityList',
    component: ActivityList,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ActivityList>;

export default meta;
type Story = StoryObj<Meta<typeof ActivityList>>;

export const Default: Story = {};
