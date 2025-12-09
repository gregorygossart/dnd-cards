import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { Checkbox } from "@/components/ui/checkbox";
import type { Card } from "@/types/card";

export const SpellComponentsInputs: React.FC = () => {
  const { control } = useFormContext<Card>();

  return (
    <div>
      <EditorLabel>Components</EditorLabel>

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
            Verbal
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
            Somatic
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
            Material
          </Label>
        </div>
      </div>
    </div>
  );
};
