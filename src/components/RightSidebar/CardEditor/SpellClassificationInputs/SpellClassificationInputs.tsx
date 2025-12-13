import { useFormContext, Controller } from "react-hook-form";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Card } from "@/features/cards/types";
import { SpellSchool } from "@/features/spells/constants";

export const SpellClassificationInputs: React.FC = () => {
  const { control } = useFormContext<Card>();

  return (
    <div className="flex gap-2">
      {/* School */}
      <div className="flex-1">
        <EditorLabel htmlFor="school">School</EditorLabel>
        <Controller
          control={control}
          name="school"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger
                id="school"
                className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9"
              >
                <SelectValue placeholder="Select school" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                {Object.values(SpellSchool).map((school) => (
                  <SelectItem key={school} value={school}>
                    {school}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Level */}
      <div className="flex-1">
        <EditorLabel htmlFor="level">Level</EditorLabel>
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
                className="bg-slate-800 border-slate-700 text-slate-100 w-full h-9"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
                <SelectItem value="0">Cantrip</SelectItem>
                <SelectItem value="1">1st Level</SelectItem>
                <SelectItem value="2">2nd Level</SelectItem>
                <SelectItem value="3">3rd Level</SelectItem>
                <SelectItem value="4">4th Level</SelectItem>
                <SelectItem value="5">5th Level</SelectItem>
                <SelectItem value="6">6th Level</SelectItem>
                <SelectItem value="7">7th Level</SelectItem>
                <SelectItem value="8">8th Level</SelectItem>
                <SelectItem value="9">9th Level</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};
