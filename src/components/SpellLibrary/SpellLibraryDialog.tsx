"use client";

import React, { useState, useMemo } from "react";
import { useT } from "next-i18next/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { srdSpells, SRDSpell } from "@/features/spells/srd-library";
import { SpellSchool } from "@/features/spells/constants";
import { Search, Sparkles, Plus } from "lucide-react";
import { useDeckStore } from "@/hooks/useDeckStore";
import { CardType } from "@/features/cards/constants";
import type { SpellCard } from "@/features/spells/types";
import { toast } from "sonner";

interface SpellLibraryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deckId: string;
}

const schoolColors: Record<SpellSchool, string> = {
  [SpellSchool.Abjuration]: "text-blue-400",
  [SpellSchool.Conjuration]: "text-yellow-400",
  [SpellSchool.Divination]: "text-cyan-400",
  [SpellSchool.Enchantment]: "text-pink-400",
  [SpellSchool.Evocation]: "text-red-400",
  [SpellSchool.Illusion]: "text-purple-400",
  [SpellSchool.Necromancy]: "text-green-400",
  [SpellSchool.Transmutation]: "text-orange-400",
};

export const SpellLibraryDialog: React.FC<SpellLibraryDialogProps> = ({
  open,
  onOpenChange,
  deckId,
}) => {
  const { t } = useT();
  const { addCardWithData } = useDeckStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSpells = useMemo(() => {
    if (!searchQuery.trim()) return srdSpells;
    const query = searchQuery.toLowerCase();
    return srdSpells.filter(
      (spell) =>
        spell.name.toLowerCase().includes(query) ||
        spell.school.toLowerCase().includes(query) ||
        spell.level.toString() === query ||
        (spell.level === 0 && query === "cantrip")
    );
  }, [searchQuery]);

  const handleImportSpell = (spell: SRDSpell) => {
    const newCard = {
      id: crypto.randomUUID(),
      type: CardType.Spell as const,
      title: spell.name,
      description: spell.description,
      visuals: {
        accentColor: "#6366f1",
        headerImage: spell.headerImage,
        backImage: spell.backImage,
      },
      school: spell.school,
      level: spell.level,
      castingTime: spell.castingTime,
      range: spell.range,
      duration: spell.duration,
      components: spell.components,
      ritual: spell.ritual,
    } as SpellCard;

    addCardWithData(deckId, newCard);
    toast.success(`Added ${spell.name} to deck`);
    onOpenChange(false);
  };

  const getLevelLabel = (level: number) => {
    if (level === 0) return t("card.spell.levels.cantrip");
    return t(`card.spell.levels.level${level}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-slate-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            {t("library.spellLibrary")}
          </DialogTitle>
        </DialogHeader>

        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder={t("library.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto mt-4 space-y-2">
          {filteredSpells.length === 0 ? (
            <div className="text-center text-slate-500 py-8">
              No spells found
            </div>
          ) : (
            filteredSpells.map((spell) => (
              <div
                key={spell.name}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${schoolColors[spell.school]}`}>
                      {spell.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                      {getLevelLabel(spell.level)}
                    </span>
                    {spell.ritual && (
                      <span className="text-xs text-violet-400">
                        {t("card.spell.ritual")}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {spell.school} • {spell.castingTime.amount} {spell.castingTime.unit}
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleImportSpell(spell)}
                  className="ml-2 bg-violet-600 hover:bg-violet-700 text-white"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
