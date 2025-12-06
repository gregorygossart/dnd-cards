import React from 'react';
import { formatCastingTime, formatRange, formatDuration, formatComponents } from '@/lib/cardUtils';
import type { CastingTime, Range, Duration, Components } from '@/types/card';
import { Badge } from '@/components/ui/badge';
import { useDeckStore } from '@/hooks/useDeckStore';

interface SpellStatsProps {
    castingTime: CastingTime;
    range: Range;
    duration: Duration;
    ritual: boolean;
    components: Components;
}

export const SpellStats: React.FC<SpellStatsProps> = ({ castingTime, range, duration, ritual, components }) => {
    // Check if concentration is present and true
    const hasConcentration = 'concentration' in duration && duration.concentration;

    // Get body font size and calculate badge size (2px smaller to maintain hierarchy)
    const { decks, currentDeckIndex } = useDeckStore();
    const bodyFontSize = decks[currentDeckIndex]?.typography?.bodyFontSize ?? 14;
    const badgeFontSize = bodyFontSize - 2;

    return (
        <div className="px-5 py-1.5 flex gap-1.5 flex-wrap justify-center">
            <Badge
                variant="secondary"
                style={{ fontSize: `${badgeFontSize}px` }}
            >
                {formatCastingTime(castingTime)}
            </Badge>
            {ritual && (
                <Badge
                    variant="secondary"
                    style={{ fontSize: `${badgeFontSize}px` }}
                >
                    Ritual
                </Badge>
            )}
            <Badge
                variant="secondary"
                style={{ fontSize: `${badgeFontSize}px` }}
            >
                {formatRange(range)}
            </Badge>
            {hasConcentration && (
                <Badge
                    variant="secondary"
                    style={{ fontSize: `${badgeFontSize}px` }}
                >
                    Concentration
                </Badge>
            )}
            <Badge
                variant="secondary"
                style={{ fontSize: `${badgeFontSize}px` }}
            >
                {formatDuration(duration)}
            </Badge>
            {(components.material || components.somatic || components.verbal) && <Badge
                variant="secondary"
                style={{ fontSize: `${badgeFontSize}px` }}
            >
                {formatComponents(components)}
            </Badge>}
        </div>
    );
};

