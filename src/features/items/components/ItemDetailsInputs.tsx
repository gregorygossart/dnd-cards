import { useFormContext } from "react-hook-form";
import { CollapsibleGroup } from "@/components/ui/collapsible-group";
import { ItemSubtype } from "@/features/items/constants";
import { ItemSubtypeSelect } from "./ItemSubtypeSelect";
import { RaritySelect } from "./RaritySelect";
import { AttunementSwitch } from "./AttunementSwitch";
import { WeaponStatsInputs } from "../weapons/components/WeaponStatsInputs";

export const ItemDetailsInputs: React.FC = () => {
  const { watch } = useFormContext();
  const subtype = watch("subtype");

  return (
    <CollapsibleGroup title="Item Details" defaultOpen={true}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <ItemSubtypeSelect />
          <RaritySelect />
        </div>

        {subtype === ItemSubtype.Weapon && <WeaponStatsInputs />}

        <AttunementSwitch />
      </div>
    </CollapsibleGroup>
  );
};
