import React from 'react';
import { Card } from '@/types/card';
import { CardHeader } from '../CardHeader/CardHeader';
import { CardBody } from '../CardBody/CardBody';
import { SpellStats } from '../SpellStats/SpellStats';
import { CardBanner } from '../CardBanner/CardBanner';
import { CardArtArea } from '../CardArtArea/CardArtArea';
import { getCardSubtitle } from '@/lib/cardUtils';
import { getCardRadii } from '@/lib/cardConstants';
import { useDeckStore } from '@/hooks/useDeckStore';

interface CardFrontProps {
    data: Card;
}

export const CardFront: React.FC<CardFrontProps> = ({ data }) => {
    const { title, description, visuals } = data;
    const { outerRadius, padding, innerRadius } = getCardRadii();

    // Get title font size from current deck's typography settings
    const { decks, currentDeckIndex } = useDeckStore();
    const titleFontSize = decks[currentDeckIndex]?.typography?.titleFontSize ?? 24;

    return (
        <div
            className={`w-full h-full bg-black flex items-center justify-center`}
            style={{ padding, borderRadius: outerRadius }}
        >
            <div className={`w-full h-full flex flex-col overflow-hidden`} style={{ borderRadius: innerRadius }}>
                <CardArtArea
                    image={visuals.headerImage}
                />

                {/* Content Area */}
                <div
                    className="flex-1 min-h-0 flex flex-col relative bg-white"
                    style={{ borderTop: `4px solid ${visuals.accentColor} ` }}
                >
                    <CardBanner
                        subtitle={getCardSubtitle(data)}
                        accentColor={visuals.accentColor}
                    />

                    <CardHeader title={title} titleFontSize={titleFontSize} />

                    {data.type === 'Spell' && data.castingTime && data.range && data.duration && data.components && (
                        <SpellStats
                            castingTime={data.castingTime}
                            range={data.range}
                            duration={data.duration}
                            ritual={data.ritual}
                            components={data.components}
                        />
                    )}

                    <CardBody
                        description={description}
                        accentColor={visuals.accentColor}
                    />
                </div>
            </div>
        </div>
    );
};
