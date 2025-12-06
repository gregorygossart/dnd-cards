import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardSchema } from '@/types/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

interface ImportExportEditorProps {
    data: Card;
    onChange: (data: Card) => void;
}

export const ImportExportEditor: React.FC<ImportExportEditorProps> = ({ data, onChange }) => {
    const [jsonText, setJsonText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);
    const [copied, setCopied] = useState(false);

    // Debounce the JSON text input
    const debouncedJsonText = useDebounce(jsonText, 500);

    // Initialize with formatted JSON
    useEffect(() => {
        setJsonText(JSON.stringify(data, null, 2));
    }, [data]);

    // Validate and save when debounced value changes
    useEffect(() => {
        // Skip validation on initial mount or if text hasn't changed
        if (!debouncedJsonText || debouncedJsonText === JSON.stringify(data, null, 2)) {
            return;
        }

        try {
            const parsed = JSON.parse(debouncedJsonText);
            const result = CardSchema.safeParse(parsed);

            if (result.success) {
                // Only update if the data actually changed
                if (JSON.stringify(result.data) !== JSON.stringify(data)) {
                    onChange(result.data);
                    setError(null);
                    setSaved(true);
                }
            } else {
                // Format Zod error with field path
                const firstError = result.error.issues[0];
                const fieldPath = firstError.path.length > 0
                    ? firstError.path.join('.')
                    : 'root';
                const message = firstError.message;
                setError(`${fieldPath}: ${message}`);
                setSaved(false);
            }
        } catch (e) {
            if (e instanceof SyntaxError) {
                console.log(e)
                setError(e.message);
            } else {
                setError('Unknown error');
            }
            setSaved(false);
        }
    }, [debouncedJsonText, data, onChange]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(jsonText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }, [jsonText]);

    return (
        <div className="h-full flex flex-col space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-slate-300 font-semibold text-sm">Card Data</h3>
                <Button
                    size="icon-sm"
                    variant="outline"
                    onClick={handleCopy}
                    className="h-7 w-7"
                    title="Copy JSON"
                >
                    {copied ? (
                        <Check className="h-3.5 w-3.5 text-green-400" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" />
                    )}
                </Button>
            </div>

            {/* Editor */}
            <Textarea
                value={jsonText}
                onChange={(e) => {
                    setJsonText(e.target.value);
                    // Clear error immediately when user starts typing
                    if (error) setError(null);
                    if (saved) setSaved(false);
                }}
                className="flex-1 font-mono text-xs bg-slate-950 border-slate-800 text-slate-300 placeholder:text-slate-600 focus-visible:ring-slate-500 resize-none"
                placeholder="Paste JSON here..."
            />

            {/* Status */}
            <div className="min-h-[24px] flex items-center">
                {saved && (
                    <div className="flex items-center gap-1.5 text-xs text-green-400">
                        <Check className="h-3.5 w-3.5" />
                        <span>Saved</span>
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400">
                        <AlertCircle className="h-3.5 w-3.5" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
