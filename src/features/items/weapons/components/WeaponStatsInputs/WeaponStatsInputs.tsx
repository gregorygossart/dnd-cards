import { WeaponTypeInput } from "./WeaponTypeInput/WeaponTypeInput";
import { WeaponDamageInput } from "./WeaponDamageInput/WeaponDamageInput";
import { WeaponRangeInput } from "./WeaponRangeInput/WeaponRangeInput";
import { WeaponPropertiesInput } from "./WeaponPropertiesInput/WeaponPropertiesInput";

export const WeaponStatsInputs: React.FC = () => {
  return (
    <div className="space-y-4">
      <WeaponTypeInput />

      <div className="grid grid-cols-2 gap-4">
        <WeaponDamageInput />
        <WeaponRangeInput />
      </div>

      <WeaponPropertiesInput />
    </div>
  );
};
