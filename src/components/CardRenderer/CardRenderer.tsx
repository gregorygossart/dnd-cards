import React from 'react';
import { Card } from '@/types/card';
import { CardFront } from './CardFront/CardFront';
import { CardBack } from './CardBack/CardBack';
import { cn } from '@/lib/utils';
import { CARD_WIDTH, CARD_HEIGHT } from '@/lib/cardConstants';

export enum CardSide {
    Front = "Front",
    Back = "Back"
}

// Internal resolution multiplier for crisp text/borders
const RESOLUTION = 1.5;

interface CardRendererProps {
    data: Card;
    className?: string;
    scale?: number;
    showShadow?: boolean;
    side?: CardSide;
}

export const CardRenderer: React.FC<CardRendererProps> = ({
    data,
    className,
    scale = 1,
    showShadow = true,
    side = CardSide.Front
}) => {
    const { visuals } = data;
    const hasCustomBack = side === CardSide.Back && !!visuals.backImage;

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
                    className={cn(
                        "relative overflow-hidden flex flex-col font-sans text-slate-900 h-full",
                        showShadow && "shadow-2xl"
                    )}
                >
                    {side === CardSide.Back ? (
                        <CardBack visuals={visuals} />
                    ) : (
                        <CardFront data={data} />
                    )}
                </div>
            </div>
        </div>
    );
};
