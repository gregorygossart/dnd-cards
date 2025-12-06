import React from 'react';
import { useDeckStore, DENSITY_PRESETS } from '@/hooks/useDeckStore';
import { DensityPreset } from '@/types/card';
import { Button } from '@/components/ui/button';
import { EditorLabel } from '@/components/CardEditor/EditorLabel/EditorLabel';

interface DensityPresetsProps {
    deckId: string;
}

export const DensityPresets: React.FC<DensityPresetsProps> = ({ deckId }) => {
    const { updateDeckStyle } = useDeckStore();

    const applyPreset = (presetName: DensityPreset) => {
        const preset = DENSITY_PRESETS[presetName];
        // Preset only contains density settings, cornerRadius is preserved automatically
        updateDeckStyle(deckId, preset);
    };

    return (
        <div className="space-y-2">
            <EditorLabel>Density Presets</EditorLabel>
            <div className="grid grid-cols-3 gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(DensityPreset.Compact)}
                    className="text-xs"
                >
                    {DensityPreset.Compact}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(DensityPreset.Normal)}
                    className="text-xs"
                >
                    {DensityPreset.Normal}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => applyPreset(DensityPreset.Spacious)}
                    className="text-xs"
                >
                    {DensityPreset.Spacious}
                </Button>
            </div>
        </div>
    );
};
