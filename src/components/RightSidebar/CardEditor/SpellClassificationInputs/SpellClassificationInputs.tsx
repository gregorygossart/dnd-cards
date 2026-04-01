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
        <EditorLabel htmlFor="school">{t("editor.propertiesTab.spellDetails.school.label")}</EditorLabel>
        <Controller
          control={control}
          name="school"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="school"
                className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9 truncate [&_span]:truncate"
              >
                <SelectValue placeholder={t("editor.propertiesTab.spellDetails.school.placeholder")} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.values(SpellSchool).map((school) => (
                  <SelectItem key={school} value={school}>
                    {t(`editor.propertiesTab.spellDetails.school.schools.${school.toLowerCase()}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Level */}
      <div className="flex-1 min-w-0">
        <EditorLabel htmlFor="level">{t("editor.propertiesTab.spellDetails.level.label")}</EditorLabel>
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
                <SelectValue placeholder={t("editor.propertiesTab.spellDetails.level.placeholder")} />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectItem value="0">{t("editor.propertiesTab.spellDetails.level.cantrip")}</SelectItem>
                <SelectItem value="1">{t("editor.propertiesTab.spellDetails.level.level1")}</SelectItem>
                <SelectItem value="2">{t("editor.propertiesTab.spellDetails.level.level2")}</SelectItem>
                <SelectItem value="3">{t("editor.propertiesTab.spellDetails.level.level3")}</SelectItem>
                <SelectItem value="4">{t("editor.propertiesTab.spellDetails.level.level4")}</SelectItem>
                <SelectItem value="5">{t("editor.propertiesTab.spellDetails.level.level5")}</SelectItem>
                <SelectItem value="6">{t("editor.propertiesTab.spellDetails.level.level6")}</SelectItem>
                <SelectItem value="7">{t("editor.propertiesTab.spellDetails.level.level7")}</SelectItem>
                <SelectItem value="8">{t("editor.propertiesTab.spellDetails.level.level8")}</SelectItem>
                <SelectItem value="9">{t("editor.propertiesTab.spellDetails.level.level9")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

