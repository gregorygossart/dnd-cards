import React from 'react';
import { Card } from '@/types/card';
import { CardHeader } from './CardHeader/CardHeader';
import { CardBody } from './CardBody/CardBody';
import { CardFooter } from './CardFooter/CardFooter';
import { SpellStats } from './SpellStats/SpellStats';
import { CardBanner } from './CardBanner/CardBanner';
import { CardArtArea } from './CardArtArea/CardArtArea';
import { getCardSubtitle } from '@/lib/cardUtils';
import { cn } from '@/lib/utils';
import { CARD_WIDTH, CARD_HEIGHT } from '@/lib/cardConstants';

// Internal resolution multiplier for crisp text/borders
const RESOLUTION = 1.5;

interface CardRendererProps {
    data: Card;
    className?: string;
    scale?: number;
}

export const CardRenderer: React.FC<CardRendererProps> = ({ data, className, scale = 1 }) => {
    const { title, description, visuals } = data;

    return (
        <div
            className={cn("relative overflow-hidden", className)}
            style={{
                width: `${CARD_WIDTH * scale}px`,
                height: `${CARD_HEIGHT * scale}px`,
            }}
        >
            <div
                className="origin-top-left"
                style={{
                    transform: `scale(${scale / RESOLUTION})`,
                    width: `${CARD_WIDTH * RESOLUTION}px`,
                    height: `${CARD_HEIGHT * RESOLUTION}px`,
                }}
            >
                <div
                    className="relative rounded-[24px] overflow-hidden flex flex-col bg-white shadow-2xl font-sans text-slate-900 h-full"
                    style={{
                        border: `2px solid ${visuals.accentColor} `,
                    }}
                >
                    <CardArtArea
                        backgroundImage={visuals.backgroundImage}
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

                        <CardHeader title={title} />

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

                        <CardFooter />
                    </div>
                </div>
            </div>
        </div>
    );
};
