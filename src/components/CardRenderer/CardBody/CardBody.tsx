import React from 'react';

interface CardBodyProps {
    description: string;
    accentColor: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ description, accentColor }) => {
    return (
        <div className="px-5 py-2 flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 text-sm text-slate-700">
            <div
                className="rich-text-content light"
                style={{ '--accent-color': accentColor } as React.CSSProperties}
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};
