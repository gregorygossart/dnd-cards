import React from 'react';

interface CardArtAreaProps {
    backgroundImage?: string;
    children?: React.ReactNode;
}

export const CardArtArea: React.FC<CardArtAreaProps> = ({ backgroundImage, children }) => {
    return (
        <div
            className="relative w-full h-[180px] bg-gradient-to-b from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {children}
        </div>
    );
};
