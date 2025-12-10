import { CollapsibleGroup } from "@/components/ui/collapsible-group";
import { WeaponTypeInput } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponTypeInput/WeaponTypeInput";
import { WeaponDamageInput } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponDamageInput/WeaponDamageInput";
import { WeaponRangeInput } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponRangeInput/WeaponRangeInput";
import { WeaponPropertiesInput } from "@/features/items/weapons/components/WeaponDetailsInputs/WeaponPropertiesInput/WeaponPropertiesInput";

export const WeaponDetailsInputs: React.FC = () => {
  return (
    <CollapsibleGroup title="Weapon Details" defaultOpen={true}>
      <div className="space-y-4">
        <WeaponTypeInput />

        <div className="grid grid-cols-2 gap-4">
          <WeaponDamageInput />
          <WeaponRangeInput />
        </div>

        <WeaponPropertiesInput />
      </div>
    </CollapsibleGroup>
  );
};
