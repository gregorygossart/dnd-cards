import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardBody } from '@/components/CardRenderer/CardBody/CardBody';

describe('CardBody', () => {
    it('renders text blocks', () => {
        const blocks = [
            { type: 'text' as const, content: 'This is a test paragraph.' }
        ];
        render(<CardBody blocks={blocks} />);
        expect(screen.getByText('This is a test paragraph.')).toBeDefined();
    });

    it('renders separator blocks', () => {
        const blocks = [
            { type: 'separator' as const, content: null }
        ];
        const { container } = render(<CardBody blocks={blocks} />);
        expect(container.querySelector('hr')).toBeDefined();
    });



    it('renders multiple blocks in order', () => {
        const blocks = [
            { type: 'text' as const, content: 'First paragraph' },
            { type: 'separator' as const, content: null },
            { type: 'text' as const, content: 'Second paragraph' }
        ];
        const { container } = render(<CardBody blocks={blocks} />);
        const paragraphs = container.querySelectorAll('p');
        expect(paragraphs[0].textContent).toBe('First paragraph');
        expect(paragraphs[1].textContent).toBe('Second paragraph');
    });
});
