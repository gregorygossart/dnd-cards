import { CollapsibleGroup } from "@/components/ui/collapsible-group";
import { ArmorTypeSelect } from "./ArmorTypeSelect/ArmorTypeSelect";
import { ArmorACInput } from "./ArmorACInput/ArmorACInput";
import { ArmorStrengthInput } from "./ArmorStrengthInput/ArmorStrengthInput";
import { ArmorStealthSwitch } from "./ArmorStealthSwitch/ArmorStealthSwitch";
import { RaritySelect } from "@/features/items/components/ItemDetailsInputs/RaritySelect/RaritySelect";
import { AttunementSwitch } from "@/features/items/components/ItemDetailsInputs/AttunementSwitch/AttunementSwitch";

export const ArmorDetailsInputs: React.FC = () => {
  return (
    <CollapsibleGroup title="Armor Details" defaultOpen={true}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <RaritySelect />
          <ArmorTypeSelect />
        </div>
        <AttunementSwitch />
        <div className="grid grid-cols-2 gap-4">
          <ArmorACInput />
          <ArmorStrengthInput />
        </div>
        <ArmorStealthSwitch />
      </div>
    </CollapsibleGroup>
  );
};
