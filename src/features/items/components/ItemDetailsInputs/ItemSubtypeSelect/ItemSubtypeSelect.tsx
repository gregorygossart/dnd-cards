import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { ItemSubtype } from "@/features/items/constants";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";

export const ItemSubtypeSelect: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-1">
      <EditorLabel>Item Type</EditorLabel>
      <FormField
        control={control}
        name="subtype"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9">
                  <SelectValue placeholder="Select item type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.values(ItemSubtype).map((subtype) => (
                  <SelectItem key={subtype} value={subtype}>
                    {subtype}
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
