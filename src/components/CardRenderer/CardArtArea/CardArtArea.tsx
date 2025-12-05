import React from 'react';

interface CardArtAreaProps {
    image?: string;
}

export const CardArtArea: React.FC<CardArtAreaProps> = ({ image }) => {
    return (
        <div
            className="h-[200px] bg-slate-200 relative bg-cover bg-center"
            style={{
                backgroundImage: image ? `url(${image})` : undefined,
            }}
        />
    );
};
