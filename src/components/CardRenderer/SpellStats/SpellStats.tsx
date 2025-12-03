import React from 'react';
import { formatCastingTime, formatRange, formatDuration, formatComponents } from '@/lib/cardUtils';
import type { CastingTime, Range, Duration, Components } from '@/types/card';
import { Badge } from '@/components/ui/badge';

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

    return (
        <div className="px-5 py-2 flex gap-1.5 flex-wrap justify-center">
            <Badge
                variant="secondary"
                className="text-xs"
            >
                {formatCastingTime(castingTime)}
            </Badge>
            {ritual && (
                <Badge
                    variant="secondary"
                    className="text-xs"
                >
                    Ritual
                </Badge>
            )}
            <Badge
                variant="secondary"
                className="text-xs"
            >
                {formatRange(range)}
            </Badge>
            {hasConcentration && (
                <Badge
                    variant="secondary"
                    className="text-xs"
                >
                    Concentration
                </Badge>
            )}
            <Badge
                variant="secondary"
                className="text-xs"
            >
                {formatDuration(duration)}
            </Badge>
            {(components.material || components.somatic || components.verbal) && <Badge
                variant="secondary"
                className="text-xs"
            >
                {formatComponents(components)}
            </Badge>}
        </div>
    );
};
