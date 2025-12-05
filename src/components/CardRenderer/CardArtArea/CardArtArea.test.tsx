import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CardArtArea } from '@/components/CardRenderer/CardArtArea/CardArtArea';

describe('CardArtArea', () => {
    it('renders a placeholder when no image is provided', () => {
        render(<CardArtArea />);
        expect(screen.getByText('No Image')).toBeDefined();
    });

    it('renders an image when image is provided', () => {
        render(<CardArtArea image="https://example.com/image.jpg" />);
        expect(screen.queryByText('No Image')).toBeNull();
    });
});
