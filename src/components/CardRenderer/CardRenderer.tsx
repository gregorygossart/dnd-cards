import React from 'react';
import type { Card } from '@/types/card';
import { cn } from '@/lib/utils';
import { CardArtArea } from '@/components/CardRenderer/CardArtArea/CardArtArea';
import { CardBanner } from '@/components/CardRenderer/CardBanner/CardBanner';
import { CardHeader } from '@/components/CardRenderer/CardHeader/CardHeader';
import { CardBody } from '@/components/CardRenderer/CardBody/CardBody';
import { CardFooter } from '@/components/CardRenderer/CardFooter/CardFooter';

interface CardRendererProps {
    data: Card;
    className?: string;
}

export const CardRenderer: React.FC<CardRendererProps> = ({ data, className }) => {
    const { title, type, blocks, visuals } = data;

    return (
        <div
            className={cn(
                "relative w-[320px] h-[480px] rounded-[24px] overflow-hidden flex flex-col bg-white shadow-2xl font-sans text-slate-900",
                className
            )}
            style={{
                border: `2px solid ${visuals.accentColor} `,
            }}
        >
            <CardArtArea
                backgroundImage={visuals.backgroundImage}
            />

            {/* Content Area */}
            <div
                className="flex-1 flex flex-col relative bg-white"
                style={{ borderTop: `4px solid ${visuals.accentColor} ` }}
            >
                <CardBanner
                    subtitle={type}
                    accentColor={visuals.accentColor}
                />

                <CardHeader title={title} />

                <CardBody blocks={blocks} />

                <CardFooter />
            </div>
        </div>
    );
};
