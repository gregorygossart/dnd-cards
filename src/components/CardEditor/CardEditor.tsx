import React, { useEffect, useRef } from 'react';
import { useForm, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Card } from '@/types/card';
import { CardSchema, CastingTimeUnit, RangeType, RangeDistanceUnit, DurationType, CardType, CardBaseData } from '@/types/card';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';
import { GeneralCardInputs } from '@/components/CardEditor/GeneralCardInputs/GeneralCardInputs';
import { CardTypeSelector } from '@/components/CardEditor/CardTypeSelector/CardTypeSelector';
import { SpellComponentsInputs } from '@/components/CardEditor/SpellComponentsInputs/SpellComponentsInputs';
import { SpellDurationInputs } from '@/components/CardEditor/SpellDurationInputs/SpellDurationInputs';
import { SpellRangeInputs } from '@/components/CardEditor/SpellRangeInputs/SpellRangeInputs';
import { CastingTimeInputs } from '@/components/CardEditor/CastingTimeInputs/CastingTimeInputs';
import { SpellClassificationInputs } from '@/components/CardEditor/SpellClassificationInputs/SpellClassificationInputs';
import { AccentColorInput } from '@/components/CardEditor/AccentColorInput/AccentColorInput';
import { CollapsibleGroup } from '@/components/ui/collapsible-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface CardEditorProps {
    initialData: Card;
    onChange: (data: Card) => void;
}

const baseDefaultCardValues: CardBaseData = {
    title: 'New Card',
    blocks: [
        { type: 'text', content: 'Card rules text goes here.' }],
    visuals: {
        accentColor: '#ffc814'
    }
}

export const defaultCardValues: Record<CardType, Card> = {
    [CardType.Item]: {
        ...baseDefaultCardValues,
        type: CardType.Item,
    },
    [CardType.Spell]: {
        ...baseDefaultCardValues,
        type: CardType.Spell,
        castingTime: { amount: 1, unit: CastingTimeUnit.Action },
        range: { type: RangeType.Ranged, distance: { amount: 60, unit: RangeDistanceUnit.Feet } },
        duration: { type: DurationType.Instantaneous },
        ritual: false,
        components: { verbal: false, somatic: false, material: false },
        school: undefined,
        level: undefined,
    },
    [CardType.Ability]: {
        ...baseDefaultCardValues,
        type: CardType.Ability,
    },
};

export const CardEditor: React.FC<CardEditorProps> = ({ initialData, onChange }) => {
    const form = useForm<Card>({
        resolver: zodResolver(CardSchema),
        defaultValues: initialData,
        mode: 'onChange',
    });

    const { control, register, watch } = form;
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
        <FormProvider {...form}>
            <div className="w-full h-full overflow-y-auto p-4 space-y-6">
                <CardTypeSelector
                    value={watch('type')}
                    onChange={(value) => {
                        const defaults = defaultCardValues[value];
                        form.reset(defaults);
                    }}
                />

                <GeneralCardInputs />

                {/* Spell-specific fields */}
                {watch('type') === 'Spell' && (
                    <CollapsibleGroup title="Spell Details" defaultOpen={true}>
                        <div className="grid grid-cols-2 gap-4">
                            <SpellClassificationInputs />

                            {/* Casting Time */}
                            <CastingTimeInputs />

                            {/* Range */}
                            <div className="col-span-2">
                                <SpellRangeInputs />
                            </div>

                            {/* Duration */}
                            <div className="col-span-2">
                                <SpellDurationInputs />
                            </div>

                            {/* Components */}
                            <div className="col-span-2">
                                <SpellComponentsInputs />
                            </div>
                        </div>
                    </CollapsibleGroup>
                )}

                <CollapsibleGroup title="Content Blocks" defaultOpen={true}>
                    <div className="space-y-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-3 bg-slate-800 rounded-md space-y-2">
                                <div className="flex items-center justify-between">
                                    <Controller
                                        control={control}
                                        name={`blocks.${index}.type`}
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-[140px] bg-slate-700 border-slate-600 text-slate-100">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                                                    <SelectItem value="text">Text</SelectItem>
                                                    <SelectItem value="separator">Separator</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => remove(index)}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-950"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                {watch(`blocks.${index}.type`) === 'text' && (
                                    <Textarea
                                        {...register(`blocks.${index}.content` as const)}
                                        placeholder="Enter text content..."
                                        className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-500 min-h-[100px]"
                                    />
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ type: 'text', content: '' })}
                            className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Block
                        </Button>
                    </div>
                </CollapsibleGroup>

                <CollapsibleGroup title="Visual Style" defaultOpen={true}>
                    <div className="space-y-4">
                        <AccentColorInput />
                    </div>
                </CollapsibleGroup>
            </div>
        </FormProvider>
    );
};
