import { useFormContext } from "react-hook-form";
import { CollapsibleGroup } from "@/components/ui/collapsible-group";
import { ItemSubtypeSelect } from "@/features/items/components/ItemDetailsInputs/ItemSubtypeSelect/ItemSubtypeSelect";
import { RaritySelect } from "@/features/items/components/ItemDetailsInputs/RaritySelect/RaritySelect";
import { AttunementSwitch } from "@/features/items/components/ItemDetailsInputs/AttunementSwitch/AttunementSwitch";
import { ItemSubtype } from "@/features/items/constants";
import { WeaponDetailsInputs } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponDetailsInputs";

export const ItemDetailsInputs: React.FC = () => {
  const { watch } = useFormContext();

  return (
    <>
      <CollapsibleGroup title="Item Details" defaultOpen={true}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <RaritySelect />
            <ItemSubtypeSelect />
          </div>

          <AttunementSwitch />
        </div>
      </CollapsibleGroup>

      {watch("subtype") === ItemSubtype.Weapon && <WeaponDetailsInputs />}
    </>
  );
};
