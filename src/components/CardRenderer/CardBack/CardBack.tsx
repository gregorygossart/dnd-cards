import React from 'react';
import { CardVisuals } from '@/types/card';
import { getCardRadii } from '@/lib/cardConstants';

interface CardBackProps {
    visuals: CardVisuals;
}


export const CardBack: React.FC<CardBackProps> = ({ visuals }) => {
    const { outerRadius, padding, innerRadius } = getCardRadii();

    return (
        <div
            className="w-full h-full bg-black flex items-center justify-center"
            style={{ padding, borderRadius: outerRadius }}
        >
            <div
                className="w-full h-full relative bg-cover bg-center overflow-hidden"
                style={{
                    backgroundImage: visuals.backImage ? `url(${visuals.backImage})` : undefined,
                    backgroundColor: visuals.backImage ? undefined : '#E8D0A9',
                    borderRadius: innerRadius,
                }}
            >
                {visuals.backTint && (
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundColor: visuals.backTint,
                            mixBlendMode: 'overlay',
                        }}
                    />
                )}
            </div>
        </div>
    );
};
