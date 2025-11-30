import React, { useState } from 'react';
import type { Card } from '@/types/card';
import { CardSchema } from '@/types/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CardImporterProps {
    onImport: (data: Card) => void;
}

export const CardImporter: React.FC<CardImporterProps> = ({ onImport }) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleImport = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            // Validate against schema
            const result = CardSchema.safeParse(parsed);

            if (result.success) {
                onImport(result.data);
                setError(null);
                setJsonInput(''); // Clear after success? Or keep?
            } else {
                console.error(result.error);
                setError("Invalid Card JSON: " + result.error.issues[0].message);
            }
        } catch {
            setError("Invalid JSON syntax");
        }
    };

    return (
        <div className="w-full h-full space-y-4">
            <h3 className="text-slate-300 font-semibold text-sm">Paste JSON Data</h3>
            <Textarea
                placeholder="Paste JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={12}
                className="font-mono text-xs bg-slate-800 border-slate-700 text-slate-300 placeholder:text-slate-600 focus-visible:ring-slate-500"
            />
            {error && (
                <div className="bg-red-900/20 text-red-400 p-3 rounded text-xs border border-red-900/50">
                    <strong>Error:</strong> {error}
                </div>
            )}
            <Button onClick={handleImport} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                Import
            </Button>
        </div>
    );
};
