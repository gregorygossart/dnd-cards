import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { Checkbox } from "@/components/ui/checkbox";
import { useT } from "next-i18next/client";
import type { Card } from "@/features/cards/types";

export const SpellComponentsInputs: React.FC = () => {
  const { control } = useFormContext<Card>();
  const { t } = useT();

  return (
    <div>
      <EditorLabel>{t("spell.components.label")}</EditorLabel>

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
            {t("spell.components.verbal")}
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
            {t("spell.components.somatic")}
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
            {t("spell.components.material")}
          </Label>
        </div>
      </div>
    </div>
  );
};

