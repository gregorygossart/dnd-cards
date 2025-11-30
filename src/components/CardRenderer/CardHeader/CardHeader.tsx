import React from 'react';

interface CardHeaderProps {
    title: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title }) => {
    return (
        <div className="px-5 pt-1 pb-1 text-center">
            <h2 className="text-2xl font-black tracking-tight uppercase leading-none">
                {title}
            </h2>
        </div>
    );
};
