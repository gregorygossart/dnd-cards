import React from 'react';
import { CardVisuals } from '@/types/card';

interface CardBackProps {
    visuals: CardVisuals;
}

export const CardBack: React.FC<CardBackProps> = ({ visuals }) => {
    return (
        <div
            className="w-full h-full bg-slate-200 relative bg-cover bg-center overflow-hidden"
            style={{
                backgroundImage: visuals.backImage ? `url(${visuals.backImage})` : undefined,
                backgroundColor: visuals.backImage ? undefined : '#E8D0A9',
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
    );
};
