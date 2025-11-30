import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ImageInputProps {
    value?: string;
    onChange: (value: string | undefined) => void;
    label?: string;
}

export const ImageInput: React.FC<ImageInputProps> = ({
    value,
    onChange,
    label = 'Header Image'
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                onChange(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="backgroundImage" className="text-slate-300">{label}</Label>
            <div className="space-y-2">
                <div className="flex gap-2">
                    <Input
                        id="backgroundImageUrl"
                        value={value || ''}
                        onChange={(e) => onChange(e.target.value || undefined)}
                        placeholder="Enter image URL or upload file"
                        className="flex-1 bg-slate-800 border-slate-700 text-slate-100 text-xs placeholder:text-slate-500"
                    />
                    <input
                        id="backgroundImageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('backgroundImageFile')?.click()}
                        type="button"
                        className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-100 h-9 text-xs px-3"
                    >
                        Upload
                    </Button>
                </div>
                {value && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onChange(undefined)}
                        type="button"
                        className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-100 h-7 text-xs w-full"
                    >
                        Clear Image
                    </Button>
                )}
            </div>
        </div>
    );
};
