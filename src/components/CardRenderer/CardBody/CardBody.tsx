import React from 'react';
import { useDeckStore } from '@/hooks/useDeckStore';

interface CardBodyProps {
    description: string;
    accentColor: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ description, accentColor }) => {
    // Get body font size from current deck's typography settings
    const { decks, currentDeckIndex } = useDeckStore();
    const bodyFontSize = decks[currentDeckIndex]?.typography?.bodyFontSize ?? 14;
    const lineHeight = decks[currentDeckIndex]?.typography?.lineHeight ?? 1.5;

    return (
        <div
            className="px-5 py-1.5 flex-1 min-h-0 flex flex-col gap-2 text-slate-700"
            style={{ fontSize: `${bodyFontSize}px` }}
        >
            <style>{`
                .card-body-content * {
                    line-height: ${lineHeight} !important;
                }
            `}</style>
            <div
                className="rich-text-content light card-body-content"
                style={{ '--accent-color': accentColor } as React.CSSProperties}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};
