import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { ItemRarity } from "@/features/items/constants";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const RaritySelect: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-1">
      <EditorLabel>Rarity</EditorLabel>
      <FormField
        control={control}
        name="rarity"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9">
                  <SelectValue placeholder="Select rarity" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.values(ItemRarity).map((rarity) => (
                  <SelectItem key={rarity} value={rarity}>
                    {rarity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
};
