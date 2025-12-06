import React from 'react';
import { useDeckStore } from '@/hooks/useDeckStore';
import { Slider } from '@/components/ui/slider';
import { EditorLabel } from '@/components/CardEditor/EditorLabel/EditorLabel';
import { CollapsibleGroup } from '@/components/ui/collapsible-group';

interface DeckSettingsProps {
    deckId: string;
}

export const DeckSettings: React.FC<DeckSettingsProps> = ({ deckId }) => {
    const { decks, updateDeckTypography } = useDeckStore();
    const deck = decks.find(d => d.id === deckId);
    const titleFontSize = deck?.typography?.titleFontSize ?? 24;
    const bodyFontSize = deck?.typography?.bodyFontSize ?? 14;
    const lineHeight = deck?.typography?.lineHeight ?? 1.5;
    const paddingMultiplier = deck?.typography?.paddingMultiplier ?? 1.0;

    const handleTitleSizeChange = (value: number[]) => {
        updateDeckTypography(deckId, { titleFontSize: value[0] });
    };

    const handleBodySizeChange = (value: number[]) => {
        updateDeckTypography(deckId, { bodyFontSize: value[0] });
    };

    const handleLineHeightChange = (value: number[]) => {
        updateDeckTypography(deckId, { lineHeight: value[0] });
    };

    const handlePaddingChange = (value: number[]) => {
        updateDeckTypography(deckId, { paddingMultiplier: value[0] });
    };

    return (
        <div className="p-4">
            <CollapsibleGroup title="Deck Settings" defaultOpen={false}>
                <div className="space-y-6">
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
                </div>
            </CollapsibleGroup>
        </div>
    );
};
