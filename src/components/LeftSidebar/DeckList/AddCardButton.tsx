"use client";

import React, { useState } from "react";
import { useT } from "next-i18next/client";
import { useDeckStore } from "@/hooks/useDeckStore";
import { CardType } from "@/features/cards/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sparkles, Zap, Sword, Shield, Plus, BookOpen } from "lucide-react";

interface AddCardButtonProps {
  deckId: string;
  onOpenLibrary?: () => void;
}

const cardTypes = [
  { type: CardType.Spell, icon: Sparkles, labelKey: "spell" },
  { type: CardType.Ability, icon: Zap, labelKey: "ability", disabled: true },
  { type: CardType.Weapon, icon: Sword, labelKey: "weapon", disabled: true },
  { type: CardType.Armor, icon: Shield, labelKey: "armor", disabled: true },
];

export const AddCardButton: React.FC<AddCardButtonProps> = ({ deckId, onOpenLibrary }) => {
  const { addCard } = useDeckStore();
  const { t } = useT();
  const [open, setOpen] = useState(false);

  const handleSelect = (type: CardType, disabled?: boolean) => {
    if (disabled) return;
    addCard(deckId, type);
    setOpen(false);
  };

  const handleLibrary = () => {
    onOpenLibrary?.();
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 group hover:bg-slate-800/50 text-slate-400 hover:text-slate-300 border border-dashed border-slate-700 mt-1"
        >
          <div className="w-4 h-4 rounded shrink-0 bg-slate-700 group-hover:bg-violet-600 flex items-center justify-center">
            <Plus className="w-3 h-3" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="truncate font-medium">{t("card.add.buttonLabel")}</span>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-slate-800 border-slate-700 min-w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuItem
          onClick={handleLibrary}
          className="text-slate-300 focus:bg-slate-700 focus:text-slate-100 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{t("library.fromLibrary")}</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
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
