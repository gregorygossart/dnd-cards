import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CollapsibleGroup } from './collapsible-group';

describe('CollapsibleGroup', () => {
    it('renders with title and children', () => {
        render(
            <CollapsibleGroup title="Test Group">
                <div>Test Content</div>
            </CollapsibleGroup>
        );

        expect(screen.getByText('Test Group')).toBeDefined();
        expect(screen.getByText('Test Content')).toBeDefined();
    });
});
