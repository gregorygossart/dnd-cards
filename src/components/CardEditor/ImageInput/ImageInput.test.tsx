import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ImageInput } from '@/components/CardEditor/ImageInput/ImageInput';

describe('ImageInput', () => {
    it('renders with default label', () => {
        const onChange = vi.fn();
        render(<ImageInput onChange={onChange} fieldName="visuals.headerImage" />);

        expect(screen.getByText('Header Image')).toBeDefined();
    });

    it('renders with custom label', () => {
        const onChange = vi.fn();
        render(<ImageInput onChange={onChange} fieldName="visuals.headerImage" label="Custom Label" />);

        expect(screen.getByText('Custom Label')).toBeDefined();
    });

    it('displays the current value in the input field', () => {
        const onChange = vi.fn();
        const testUrl = 'https://example.com/image.jpg';
        render(<ImageInput value={testUrl} onChange={onChange} fieldName="visuals.headerImage" />);

        const input = screen.getByPlaceholderText('Enter image URL or upload file') as HTMLInputElement;
        expect(input.value).toBe(testUrl);
    });

    it('calls onChange when URL input changes', () => {
        const onChange = vi.fn();
        render(<ImageInput onChange={onChange} fieldName="visuals.headerImage" />);

        const input = screen.getByPlaceholderText('Enter image URL or upload file');
        fireEvent.change(input, { target: { value: 'https://example.com/new-image.jpg' } });

        expect(onChange).toHaveBeenCalledWith('https://example.com/new-image.jpg');
    });

    it('shows Clear Image button when value is present', () => {
        const onChange = vi.fn();
        render(<ImageInput value="https://example.com/image.jpg" onChange={onChange} fieldName="visuals.headerImage" />);

        expect(screen.getByText('Clear Image')).toBeDefined();
    });

    it('does not show Clear Image button when value is empty', () => {
        const onChange = vi.fn();
        render(<ImageInput onChange={onChange} fieldName="visuals.headerImage" />);

        expect(screen.queryByText('Clear Image')).toBeNull();
    });

    it('calls onChange with undefined when Clear Image is clicked', () => {
        const onChange = vi.fn();
        render(<ImageInput value="https://example.com/image.jpg" onChange={onChange} fieldName="visuals.headerImage" />);

        const clearButton = screen.getByText('Clear Image');
        fireEvent.click(clearButton);

        expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('renders Upload button', () => {
        const onChange = vi.fn();
        render(<ImageInput onChange={onChange} fieldName="visuals.headerImage" />);

        expect(screen.getByText('Upload')).toBeDefined();
    });
});
