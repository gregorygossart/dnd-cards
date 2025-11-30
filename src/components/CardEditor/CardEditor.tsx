import React, { useEffect, useRef } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Card } from '@/types/card';
import { CardSchema } from '@/types/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card as UICard, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import { ImageInput } from './ImageInput/ImageInput';
import { CardTypeSelector } from './CardTypeSelector/CardTypeSelector';
import { Separator } from '@/components/ui/separator';
import { assertUnreachable } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CollapsibleGroup } from '@/components/ui/collapsible-group';

interface CardEditorProps {
    initialData: Card;
    onChange: (data: Card) => void;
}

export const CardEditor: React.FC<CardEditorProps> = ({ initialData, onChange }) => {
    const form = useForm<Card>({
        resolver: zodResolver(CardSchema),
        defaultValues: initialData,
        mode: 'onChange',
    });

    const { register, control, watch } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'blocks',
    });

    // Use a ref to track if we've already notified the parent
    const isInitialMount = useRef(true);

    // Subscribe to form changes
    useEffect(() => {
        const subscription = watch((value) => {
            // Skip the initial mount to avoid calling onChange with initial data
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }
            onChange(value as Card);
        });
        return () => subscription.unsubscribe();
    }, [watch, onChange]);

    return (
        <div className="w-full h-full overflow-y-auto p-4 space-y-6">
            <div className="space-y-4">
                <CardTypeSelector
                    value={watch('type')}
                    onChange={(value) => form.setValue('type', value)}
                />

                <Separator className="my-6 bg-slate-700" />

                <ImageInput
                    value={watch('visuals.backgroundImage')}
                    onChange={(value) => form.setValue('visuals.backgroundImage', value)}
                />

                <div className="space-y-2">
                    <Label htmlFor="title" className="text-slate-300">Title</Label>
                    <Input id="title" {...register('title')} placeholder="Card Name" className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500" />
                </div>


            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex justify-between items-center">
                    <Label className="text-slate-300 font-semibold">Content Blocks</Label>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => append({ type: 'text', content: '' })}
                        type="button"
                        className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-100 h-7 text-xs"
                    >
                        <Plus className="w-3 h-3 mr-1" /> Add Text
                    </Button>
                </div>

                <div className="space-y-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start p-3 border border-slate-700 rounded-lg bg-slate-900/50 group">
                            <div className="flex-1 space-y-2">
                                <Controller
                                    control={control}
                                    name={`blocks.${index}.type`}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full border-slate-700 bg-slate-800 text-slate-300 text-xs mb-1 h-8">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                                                <SelectItem value="text">Text Paragraph</SelectItem>
                                                <SelectItem value="separator">Separator</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                                <Textarea
                                    {...register(`blocks.${index}.content` as const)}
                                    placeholder="Block content..."
                                    rows={3}
                                    className="bg-slate-800 border-slate-700 text-slate-100 text-sm min-h-[80px] placeholder:text-slate-600 focus-visible:ring-slate-500"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                type="button"
                                className="text-slate-500 hover:text-red-400 hover:bg-slate-800 h-6 w-6 -mt-1 -mr-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <CollapsibleGroup title="Visual Style" defaultOpen={false}>
                <div className="space-y-1">
                    <Label htmlFor="accentColor" className="text-xs text-slate-400">Accent Color</Label>
                    <div className="flex gap-2 items-center">
                        <Input
                            id="accentColor"
                            type="color"
                            value={watch('visuals.accentColor') ?? ''}
                            onChange={(e) => form.setValue('visuals.accentColor', e.target.value)}
                            className="w-8 p-0 border-0 rounded-full overflow-hidden cursor-pointer"
                        />
                        <Input
                            {...register('visuals.accentColor')}
                            placeholder="#000000"
                            className="flex-1 bg-slate-800 border-slate-700 text-slate-100 text-xs"
                        />
                    </div>
                </div>
            </CollapsibleGroup>
        </div>
    );
};
