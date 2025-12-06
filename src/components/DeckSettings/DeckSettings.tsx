import React from 'react';
import { useDeckStore } from '@/hooks/useDeckStore';
import { Slider } from '@/components/ui/slider';
import { EditorLabel } from '@/components/CardEditor/EditorLabel/EditorLabel';
import { CollapsibleGroup } from '@/components/ui/collapsible-group';
import { DensityPresets } from './DensityPresets';

interface DeckSettingsProps {
    deckId: string;
}

export const DeckSettings: React.FC<DeckSettingsProps> = ({ deckId }) => {
    const { decks, updateDeckStyle } = useDeckStore();
    const deck = decks.find(d => d.id === deckId);
    const titleFontSize = deck?.style?.titleFontSize ?? 24;
    const bodyFontSize = deck?.style?.bodyFontSize ?? 14;
    const lineHeight = deck?.style?.lineHeight ?? 1.5;
    const paddingMultiplier = deck?.style?.paddingMultiplier ?? 1.0;
    const cornerRadius = deck?.style?.cornerRadius ?? 1.5;

    const handleTitleSizeChange = (value: number[]) => {
        updateDeckStyle(deckId, { titleFontSize: value[0] });
    };

    const handleBodySizeChange = (value: number[]) => {
        updateDeckStyle(deckId, { bodyFontSize: value[0] });
    };

    const handleLineHeightChange = (value: number[]) => {
        updateDeckStyle(deckId, { lineHeight: value[0] });
    };

    const handlePaddingChange = (value: number[]) => {
        updateDeckStyle(deckId, { paddingMultiplier: value[0] });
    };

    const handleCornerRadiusChange = (value: number[]) => {
        updateDeckStyle(deckId, { cornerRadius: value[0] });
    };

    return (
        <div className="p-4">
            <CollapsibleGroup title="Deck Settings" defaultOpen={false}>
                <div className="space-y-6">
                    {/* Density Presets */}
                    <DensityPresets deckId={deckId} />

                    {/* Title Font Size */}
                    <div className="space-y-2">
                        <EditorLabel htmlFor="title-size" className="flex items-center justify-between">
                            <span>Title Size</span>
                            <span className="font-mono normal-case font-normal text-muted-foreground">
                                {titleFontSize}px
                            </span>
                        </EditorLabel>
                        <Slider
                            id="title-size"
                            min={12}
                            max={36}
                            step={1}
                            value={[titleFontSize]}
                            onValueChange={handleTitleSizeChange}
                            className="w-full"
                        />
                    </div>

                    {/* Body Font Size */}
                    <div className="space-y-2">
                        <EditorLabel htmlFor="body-size" className="flex items-center justify-between">
                            <span>Body Size</span>
                            <span className="font-mono normal-case font-normal text-muted-foreground">
                                {bodyFontSize}px
                            </span>
                        </EditorLabel>
                        <Slider
                            id="body-size"
                            min={10}
                            max={18}
                            step={1}
                            value={[bodyFontSize]}
                            onValueChange={handleBodySizeChange}
                            className="w-full"
                        />
                    </div>

                    {/* Line Height */}
                    <div className="space-y-2">
                        <EditorLabel htmlFor="line-height" className="flex items-center justify-between">
                            <span>Line Height</span>
                            <span className="font-mono normal-case font-normal text-muted-foreground">
                                {lineHeight.toFixed(1)}
                            </span>
                        </EditorLabel>
                        <Slider
                            id="line-height"
                            min={1.2}
                            max={1.8}
                            step={0.1}
                            value={[lineHeight]}
                            onValueChange={handleLineHeightChange}
                            className="w-full"
                        />
                    </div>

                    {/* Padding */}
                    <div className="space-y-2">
                        <EditorLabel htmlFor="padding" className="flex items-center justify-between">
                            <span>Padding</span>
                            <span className="font-mono normal-case font-normal text-muted-foreground">
                                {(paddingMultiplier * 100).toFixed(0)}%
                            </span>
                        </EditorLabel>
                        <Slider
                            id="padding"
                            min={0.5}
                            max={1.5}
                            step={0.1}
                            value={[paddingMultiplier]}
                            onValueChange={handlePaddingChange}
                            className="w-full"
                        />
                    </div>

                    {/* Corner Radius */}
                    <div className="space-y-2">
                        <EditorLabel htmlFor="corner-radius" className="flex items-center justify-between">
                            <span>Corner Radius</span>
                            <span className="font-mono normal-case font-normal text-muted-foreground">
                                {cornerRadius.toFixed(1)}rem
                            </span>
                        </EditorLabel>
                        <Slider
                            id="corner-radius"
                            min={0.0}
                            max={3.0}
                            step={0.1}
                            value={[cornerRadius]}
                            onValueChange={handleCornerRadiusChange}
                            className="w-full"
                        />
                    </div>
                </div>
            </CollapsibleGroup>
        </div>
    );
};
