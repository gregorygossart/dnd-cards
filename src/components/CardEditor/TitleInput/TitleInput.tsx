import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { EditorLabel } from '@/components/CardEditor/EditorLabel/EditorLabel';
import type { Card } from '@/types/card';

export const TitleInput: React.FC = () => {
    const { register } = useFormContext<Card>();

    return (
        <div>
            <EditorLabel htmlFor="title">Card Name</EditorLabel>
            <Input
                id="title"
                {...register('title')}
                placeholder="Card Name"
                className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 h-9"
            />
        </div>
    );
};
