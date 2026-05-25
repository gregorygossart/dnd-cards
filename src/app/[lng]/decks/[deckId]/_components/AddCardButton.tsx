"use client";

import React, { useState } from "react";
import { useT } from "next-i18next/client";
import { useDeckStore } from "@/hooks/useDeckStore";
import { CardType } from "@/features/cards/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Zap, Sword, Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddCardButtonProps {
  deckId: string;
}

const cardTypes = [
  { type: CardType.Spell, icon: Sparkles, labelKey: "spell" },
  { type: CardType.Ability, icon: Zap, labelKey: "ability", disabled: true },
  { type: CardType.Weapon, icon: Sword, labelKey: "weapon", disabled: true },
  { type: CardType.Armor, icon: Shield, labelKey: "armor", disabled: true },
];

export const AddCardButton: React.FC<AddCardButtonProps> = ({ deckId }) => {
  const { addCard } = useDeckStore();
  const { t } = useT();
  const [open, setOpen] = useState(false);

  const handleSelect = (type: CardType, disabled?: boolean) => {
    if (disabled) return;
    addCard(deckId, type);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t("card.add.buttonLabel")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-800 border-slate-700" align="start" sideOffset={4}>
        {cardTypes.map(({ type, icon: Icon, labelKey, disabled }) => (
          <DropdownMenuItem
            key={type}
            disabled={disabled}
            onClick={() => handleSelect(type, disabled)}
            className="text-slate-300 focus:bg-slate-700 focus:text-slate-100 cursor-pointer disabled:text-slate-600 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{t(`card.types.${labelKey}`)}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
