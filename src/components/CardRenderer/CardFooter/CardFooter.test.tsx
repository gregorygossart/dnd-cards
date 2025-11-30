import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardFooter } from '@/components/CardRenderer/CardFooter/CardFooter';

describe('CardFooter', () => {
    it('renders default text', () => {
        render(<CardFooter />);
        expect(screen.getByText('Custom Card')).toBeDefined();
    });

    it('renders copyright', () => {
        render(<CardFooter />);
        expect(screen.getByText('© 2025')).toBeDefined();
    });

    it('always renders copyright', () => {
        render(<CardFooter />);
        expect(screen.getByText('© 2025')).toBeDefined();
    });
});
