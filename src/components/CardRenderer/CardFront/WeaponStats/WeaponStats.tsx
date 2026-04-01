import React from "react";
import { Badge } from "@/components/ui/badge";
import { WeaponDamage, WeaponRange } from "@/features/items/weapons/schemas";
import {
  WeaponProperty,
  WeaponAttackType,
} from "@/features/items/weapons/constants";
import { useDeckStore, BASE_PADDING } from "@/hooks/useDeckStore";
import { useT } from "next-i18next/client";

interface WeaponStatsProps {
  attunement?: boolean;
  damage?: WeaponDamage;
  range?: WeaponRange;
  properties?: WeaponProperty[];
  attackType?: WeaponAttackType;
}

export const WeaponStats: React.FC<WeaponStatsProps> = ({
  attunement,
  damage,
  range,
  properties,
  attackType,
}) => {
  const { t } = useT();
  const { decks, currentDeckIndex } = useDeckStore();
  const bodyFontSize = decks[currentDeckIndex]?.style?.bodyFontSize ?? 14;
  const paddingMultiplier =
    decks[currentDeckIndex]?.style?.paddingMultiplier ?? 1.0;
  const badgeFontSize = bodyFontSize - 2;

  const renderDamage = () => {
    if (!damage) return null;

    const { amount, type } = damage;

    return (
      <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
        {amount} {type}
      </Badge>
    );
  };

  const renderVersatile = () => {
    if (!properties?.includes(WeaponProperty.Versatile)) return null;
    if (!damage?.versatile) return null;

    return (
      <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
        {t("card.weapon.versatile", { damage: damage?.versatile })}
      </Badge>
    );
  };

  const renderMeleeDistance = () => {
    if (attackType !== WeaponAttackType.Melee) return null;

    return (
      <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
        {properties?.includes(WeaponProperty.Reach)
          ? t("card.weapon.reach")
          : t("card.weapon.melee")}
      </Badge>
    );
  };

  const renderRangedDistance = () => {
    if (!range?.normal || !range?.long) return null;

    const isThrown = properties?.includes(WeaponProperty.Thrown);
    const isAmmunition = properties?.includes(WeaponProperty.Ammunition);

    if (!isThrown && !isAmmunition) return null;

    let label = "";

    if (isThrown) {
      label = t("card.weapon.thrown", { normal: range.normal, long: range.long });
    } else if (isAmmunition) {
      label = t("card.weapon.ammunition", { normal: range.normal, long: range.long });
    }

    return (
      <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
        {label}
      </Badge>
    );
  };

  const renderProperties = () => {
    if (!properties?.length) return null;

    // Remove Versatile, Reach, Thrown and Ammunition from properties as they are already displayed before
    const filteredProperties = properties.filter(
      (prop) =>
        ![
          WeaponProperty.Versatile,
          WeaponProperty.Reach,
          WeaponProperty.Thrown,
          WeaponProperty.Ammunition,
        ].includes(prop),
    );

    if (filteredProperties.length === 0) return null;

    return (
      <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
        {filteredProperties.join(", ")}
      </Badge>
    );
  };

  return (
    <div
      className="flex gap-1.5 flex-wrap justify-center w-full"
      style={{
        paddingLeft: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingRight: `${BASE_PADDING.horizontal * paddingMultiplier}px`,
        paddingTop: `${BASE_PADDING.vertical * paddingMultiplier}px`,
        paddingBottom: `${BASE_PADDING.vertical * paddingMultiplier}px`,
      }}
    >
      {attunement && (
        <Badge variant="secondary" style={{ fontSize: `${badgeFontSize}px` }}>
          {t("card.item.attunement")}
        </Badge>
      )}

      {renderDamage()}

      {renderVersatile()}

      {renderMeleeDistance()}

      {renderRangedDistance()}

      {renderProperties()}
    </div>
  );
};
