import React from 'react';
import { Card } from '@/types/card';
import { CardHeader } from '../CardHeader/CardHeader';
import { CardBody } from '../CardBody/CardBody';
import { CardFooter } from '../CardFooter/CardFooter';
import { SpellStats } from '../SpellStats/SpellStats';
import { CardBanner } from '../CardBanner/CardBanner';
import { CardArtArea } from '../CardArtArea/CardArtArea';
import { getCardSubtitle } from '@/lib/cardUtils';

interface CardFrontProps {
    data: Card;
}

export const CardFront: React.FC<CardFrontProps> = ({ data }) => {
    const { title, description, visuals } = data;

    return (
        <>
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
        </>
    );
};
