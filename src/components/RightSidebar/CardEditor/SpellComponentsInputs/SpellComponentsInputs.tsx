import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useT } from "next-i18next/client";
import type { Card } from "@/features/cards/types";

export const SpellComponentsInputs: React.FC = () => {
  const { control, watch } = useFormContext<Card>();
  const { t } = useT();

  const hasMaterial = watch("components.material");

  return (
    <div>
      <EditorLabel>{t("editor.spellDetails.components.label")}</EditorLabel>

      <div className="flex gap-4">
        <div className="flex-1 flex items-center gap-2">
          <Controller
            control={control}
            name="components.verbal"
            render={({ field }) => (
              <Checkbox
                id="verbal"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-slate-700 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
            )}
          />
          <Label
            htmlFor="verbal"
            className="text-slate-300 font-normal cursor-pointer"
          >
            {t("card.spell.components.verbal")}
          </Label>
        </div>

        <div className="flex-1 flex items-center gap-2">
          <Controller
            control={control}
            name="components.somatic"
            render={({ field }) => (
              <Checkbox
                id="somatic"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-slate-700 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
            )}
          />
          <Label
            htmlFor="somatic"
            className="text-slate-300 font-normal cursor-pointer"
          >
            {t("card.spell.components.somatic")}
          </Label>
        </div>

        <div className="flex-1 flex items-center gap-2">
          <Controller
            control={control}
            name="components.material"
            render={({ field }) => (
              <Checkbox
                id="material"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-slate-700 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
            )}
          />
          <Label
            htmlFor="material"
            className="text-slate-300 font-normal cursor-pointer"
          >
            {t("card.spell.components.material")}
          </Label>
        </div>
      </div>

      {hasMaterial && (
        <div className="mt-3 space-y-1.5">
          <EditorLabel>
            {t("editor.spellDetails.components.materialLabel")}
          </EditorLabel>
          <Controller
            control={control}
            name="components.materialDescription"
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ?? ""}
                placeholder={t("editor.spellDetails.components.materialDescriptionPlaceholder")}
                className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-500"
              />
            )}
          />
        </div>
      )}
    </div>
  );
};

