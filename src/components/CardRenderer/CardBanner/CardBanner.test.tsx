import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardBanner } from '@/components/CardRenderer/CardBanner/CardBanner';

describe('CardBanner', () => {
    it('renders default "Card Type" when no subtitle provided', () => {
        render(<CardBanner />);
        expect(screen.getByText('Card Type')).toBeDefined();
    });

    it('renders subtitle when provided', () => {
        render(<CardBanner subtitle="3rd Level Evocation" />);
        expect(screen.getByText('3rd Level Evocation')).toBeDefined();
    });

    it('applies custom accent color', () => {
        const { container } = render(<CardBanner accentColor="#ff0000" />);
        const banner = container.querySelector('div[style*="background-color"]');
        // Browsers convert hex to rgb, so check for rgb format
        expect(banner?.getAttribute('style')).toContain('rgb(255, 0, 0)');
    });
});
