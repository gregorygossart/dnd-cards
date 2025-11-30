import React from 'react';

interface CardArtAreaProps {
    backgroundImage?: string;
}

export const CardArtArea: React.FC<CardArtAreaProps> = ({ backgroundImage }) => {
    return (
        <div className="relative w-full h-48 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
            {backgroundImage ? (
                <img
                    src={backgroundImage}
                    alt="Card art"
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="text-slate-400 text-sm">No Image</div>
            )}
        </div>
    );
};
