import { CollapsibleGroup } from "@/components/ui/collapsible-group";
import { WeaponTypeSelect } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponTypeSelect/WeaponTypeSelect";
import { WeaponDamageInput } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponDamageInput/WeaponDamageInput";
import { WeaponRangeInput } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponRangeInput/WeaponRangeInput";
import { WeaponPropertiesInput } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponPropertiesInput/WeaponPropertiesInput";
import { RaritySelect } from "@/features/items/components/ItemDetailsInputs/RaritySelect/RaritySelect";
import { AttunementSwitch } from "@/features/items/components/ItemDetailsInputs/AttunementSwitch/AttunementSwitch";

export const WeaponDetailsInputs: React.FC = () => {
  return (
    <CollapsibleGroup title="Weapon Details" defaultOpen={true}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <RaritySelect />
          <WeaponTypeSelect />
        </div>
        <AttunementSwitch />
        <WeaponDamageInput />
        <WeaponRangeInput />
        <WeaponPropertiesInput />
      </div>
    </CollapsibleGroup>
  );
};
