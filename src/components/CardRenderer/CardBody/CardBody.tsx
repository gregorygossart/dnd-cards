import React from 'react';
import type { CardBlock } from '@/types/card';
import { assertUnreachable } from '@/lib/utils';

interface CardBodyProps {
    blocks: CardBlock[];
}

export const CardBody: React.FC<CardBodyProps> = ({ blocks }) => {
    return (
        <div className="px-5 py-2 flex-1 overflow-hidden flex flex-col gap-2 text-sm text-slate-700">
            {blocks.map(({ type, content }, index) => {
                switch (type) {
                    case 'text':
                        return <p key={index} className="leading-relaxed">{content}</p>;
                    case 'separator':
                        return <hr key={index} className="border-slate-200 my-1" />;
                    default:
                        return assertUnreachable(type);
                }
            })}
        </div>
    );
};
