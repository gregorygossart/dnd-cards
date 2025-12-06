import React from 'react';

interface CardHeaderProps {
    title: string;
    titleFontSize?: number; // Font size in pixels, default: 24
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, titleFontSize = 24 }) => {
    return (
        <div className="px-5 pt-1 pb-1 text-center">
            <h2
                className="font-black tracking-tight uppercase leading-none"
                style={{ fontSize: `${titleFontSize}px` }}
            >
                {title}
            </h2>
        </div>
    );
};
