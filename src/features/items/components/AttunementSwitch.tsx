import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { FormField, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const AttunementSwitch: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="flex items-center justify-between py-2">
      <EditorLabel>Attunement</EditorLabel>
      <FormField
        control={control}
        name="attunement"
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="scale-75 data-[state=checked]:bg-primary"
              />
            </FormControl>
            <Label className="text-xs font-normal text-slate-400">
              Requires Attunement
            </Label>
          </div>
        )}
      />
    </div>
  );
};
