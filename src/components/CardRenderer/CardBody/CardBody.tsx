import React from 'react';

interface CardBodyProps {
    description: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ description }) => {
    return (
        <div className="px-5 py-2 flex-1 overflow-hidden flex flex-col gap-2 text-sm text-slate-700">
            <p className="leading-relaxed whitespace-pre-wrap">{description}</p>
        </div>
    );
};
