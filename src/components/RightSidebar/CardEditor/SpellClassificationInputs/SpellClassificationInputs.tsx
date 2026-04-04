import { useFormContext, Controller } from "react-hook-form";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useT } from "next-i18next/client";
import type { Card } from "@/features/cards/types";
import { SpellSchool } from "@/features/spells/constants";

export const SpellClassificationInputs: React.FC = () => {
  const { control } = useFormContext<Card>();
  const { t } = useT();

  return (
    <div className="flex gap-2">
      {/* School */}
      <div className="flex-1 min-w-0">
        <EditorLabel htmlFor="school">{t("editor.spellDetails.school.label")}</EditorLabel>
        <Controller
          control={control}
          name="school"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="school"
                className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9 truncate [&_span]:truncate"
              >
                <SelectValue placeholder={t("editor.spellDetails.school.placeholder")} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.values(SpellSchool).map((school) => (
                  <SelectItem key={school} value={school}>
                    {t(`card.spell.schools.${school.toLowerCase()}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Level */}
      <div className="flex-1 min-w-0">
        <EditorLabel htmlFor="level">{t("editor.spellDetails.level.label")}</EditorLabel>
        <Controller
          control={control}
          name="level"
          render={({ field }) => (
            <Select
              onValueChange={(val) =>
                field.onChange(val === "" ? undefined : parseInt(val))
              }
              value={field.value?.toString() ?? ""}
            >
              <SelectTrigger
                id="level"
                className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9 truncate [&_span]:truncate"
              >
                <SelectValue placeholder={t("editor.spellDetails.level.placeholder")} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectItem value="0">{t("card.spell.levels.cantrip")}</SelectItem>
                <SelectItem value="1">{t("card.spell.levels.level1")}</SelectItem>
                <SelectItem value="2">{t("card.spell.levels.level2")}</SelectItem>
                <SelectItem value="3">{t("card.spell.levels.level3")}</SelectItem>
                <SelectItem value="4">{t("card.spell.levels.level4")}</SelectItem>
                <SelectItem value="5">{t("card.spell.levels.level5")}</SelectItem>
                <SelectItem value="6">{t("card.spell.levels.level6")}</SelectItem>
                <SelectItem value="7">{t("card.spell.levels.level7")}</SelectItem>
                <SelectItem value="8">{t("card.spell.levels.level8")}</SelectItem>
                <SelectItem value="9">{t("card.spell.levels.level9")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

