import React, { useEffect, useRef } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Card } from '@/types/card';
import { CardSchema, CastingTimeUnit, RangeType, RangeDistanceUnit, DurationType, CardType, CardBaseData } from '@/types/card';

import { Button } from '@/components/ui/button';
import { RichTextEditor } from '@/components/RichTextEditor/RichTextEditor';
import { TitleInput } from '@/components/CardEditor/TitleInput/TitleInput';
import { ImageInput } from '@/components/CardEditor/ImageInput/ImageInput';
import { CardBackSelector } from '@/components/CardEditor/CardBackSelector/CardBackSelector';
import { CardTypeSelector } from '@/components/CardEditor/CardTypeSelector/CardTypeSelector';
import { SpellComponentsInputs } from '@/components/CardEditor/SpellComponentsInputs/SpellComponentsInputs';
import { SpellDurationInputs } from '@/components/CardEditor/SpellDurationInputs/SpellDurationInputs';
import { SpellRangeInputs } from '@/components/CardEditor/SpellRangeInputs/SpellRangeInputs';
import { CastingTimeInputs } from '@/components/CardEditor/CastingTimeInputs/CastingTimeInputs';
import { SpellClassificationInputs } from '@/components/CardEditor/SpellClassificationInputs/SpellClassificationInputs';
import { AccentColorInput } from '@/components/CardEditor/AccentColorInput/AccentColorInput';
import { CollapsibleGroup } from '@/components/ui/collapsible-group';
import { DeckSettings } from '@/components/DeckSettings/DeckSettings';
import { useDeckStore } from '@/hooks/useDeckStore';


interface CardEditorProps {
    initialData: Card;
    onChange: (data: Card) => void;
}

const baseDefaultCardValues: CardBaseData = {
    title: 'New Card',
    description: 'Card rules text goes here.',
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
    const { decks, currentDeckIndex } = useDeckStore();
    const currentDeck = decks[currentDeckIndex];

    const form = useForm<Card>({
        resolver: zodResolver(CardSchema),
        defaultValues: initialData,
        mode: 'onChange',
    });

    const { register, watch, control, reset } = form;

    // Use a ref to track if we've already notified the parent
    const isInitialMount = useRef(true);

    // Reset form when initialData changes (e.g., when loading from localStorage)
    useEffect(() => {
        reset(initialData);
    }, [initialData, reset]);

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
            <div className="w-full h-full flex flex-col">
                {/* Deck Settings - Collapsed by default */}
                <DeckSettings deckId={currentDeck.id} />

                {/* Strong separator - heavily separated */}
                <div className="px-4 py-2">
                    <div className="h-0.5 bg-slate-600 rounded-full" />
                </div>

                {/* Card Properties */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <CardTypeSelector
                        value={watch('type')}
                        onChange={(value) => {
                            const defaults = defaultCardValues[value];
                            form.reset(defaults);
                        }}
                    />

                    <TitleInput />

                    {/* Spell-specific fields */}
                    {watch('type') === 'Spell' && (
                        <CollapsibleGroup title="Spell Details" defaultOpen={true}>
                            <div className="grid grid-cols-2 space-y-6">
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

                    <CollapsibleGroup title="Rules Text" defaultOpen={true}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <RichTextEditor
                                    content={field.value || ''}
                                    onChange={field.onChange}
                                    placeholder="Enter card rules..."
                                    className="min-h-[200px]"
                                />
                            )}
                        />
                    </CollapsibleGroup>

                    <CollapsibleGroup title="Visual Style" defaultOpen={true}>
                        <div className="space-y-6">
                            <ImageInput label="Header Image" fieldName="visuals.headerImage" />
                            <AccentColorInput />
                        </div>
                    </CollapsibleGroup>

                    <CollapsibleGroup title="Card Back" defaultOpen={true}>
                        <CardBackSelector />
                    </CollapsibleGroup>
                </div>
            </div>
        </FormProvider>
    );
};
