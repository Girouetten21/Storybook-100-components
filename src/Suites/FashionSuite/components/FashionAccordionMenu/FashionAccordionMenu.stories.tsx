import type { Meta, StoryObj } from '@storybook/react';
import { FashionAccordionMenu } from './FashionAccordionMenu';

const meta = {
  title: 'Navigation/FashionAccordionMenu',
  component: FashionAccordionMenu,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FashionAccordionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic version
export const Default: Story = {
  render: () => (
    <div style={{ height: '200vh', background: '#ecebe6', color: '#1a1a1a' }}>
      <h1 style={{ padding: '10vh 10vw', fontSize: '3rem', fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>
        An interactive editorial lookbook.
      </h1>
      <p style={{ padding: '0 10vw', fontSize: '1.2rem', maxWidth: '600px', lineHeight: 1.6, color: '#7a7a7a', fontFamily: 'Jost, sans-serif' }}>
        This fullscreen menu utilizes horizontal flexbox transitions. Hover over the columns to expand their physical width natively inside the browser, revealing sub-content and illuminating the photography behind it.
      </p>
      <FashionAccordionMenu />
    </div>
  ),
};
