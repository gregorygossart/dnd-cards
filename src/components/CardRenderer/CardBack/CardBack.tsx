import React from 'react';
import { CardVisuals } from '@/types/card';

interface CardBackProps {
    visuals: CardVisuals;
}

export const CardBack: React.FC<CardBackProps> = ({ visuals }) => {
    return (
        <div
            className="w-full h-full bg-slate-200 relative bg-cover bg-center"
            style={{
                backgroundImage: visuals.backImage ? `url(${visuals.backImage})` : undefined,
                backgroundColor: visuals.backImage ? undefined : '#E8D0A9',
            }}
        />
    );
};
