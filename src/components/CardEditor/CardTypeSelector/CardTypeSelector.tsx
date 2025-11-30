import React from 'react';
import { Label } from '@/components/ui/label';
import { CardType } from '@/types/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface CardTypeSelectorProps {
    value: CardType;
    onChange: (value: CardType) => void;
}

export const CardTypeSelector: React.FC<CardTypeSelectorProps> = ({ value, onChange }) => {
    return (
        <div className="space-y-2">
            <Label htmlFor="type" className="text-slate-300">Card Type</Label>
            <Select value={value} onValueChange={(val) => onChange(val as CardType)}>
                <SelectTrigger id="type" className="w-full bg-slate-800 border-slate-700 text-slate-100">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                    <SelectItem value={CardType.Item}>{CardType.Item}</SelectItem>
                    <SelectItem value={CardType.Spell}>{CardType.Spell}</SelectItem>
                    <SelectItem value={CardType.Ability}>{CardType.Ability}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};
