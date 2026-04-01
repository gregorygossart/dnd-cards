import { CardType } from "@/features/cards/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { useT } from "next-i18next/client";

interface CardTypeSelectorProps {
  value: CardType;
  onChange: (value: CardType) => void;
}

export const CardTypeSelector: React.FC<CardTypeSelectorProps> = ({
  value,
  onChange,
}) => {
  const { t } = useT();
  return (
    <Select value={value} onValueChange={(val) => onChange(val as CardType)}>
      <SelectTrigger
        id="type"
        className="w-auto min-w-[200px] h-auto p-0 border-0 bg-transparent text-slate-200 hover:text-white focus:ring-0 focus:ring-offset-0 data-[state=open]:text-white [&_svg]:opacity-100 [&_svg]:size-6 [&_svg]:text-slate-500 [&_svg]:ml-2"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-600 uppercase tracking-tight">
            {t("editor.propertiesTab.cardType.crafting")}
          </span>
          <span className="text-2xl font-black uppercase tracking-tight text-violet-500">
            {t(`card.types.${value.toLowerCase()}`)}
          </span>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-slate-800 border-slate-700 text-slate-100 min-w-[200px]">
        <SelectGroup>
          <SelectLabel>{t("editor.propertiesTab.cardType.groups.abilitiesAndSpells")}</SelectLabel>

          <SelectItem
            disabled
            value={CardType.Ability}
            className="focus:bg-slate-700 focus:text-slate-100 cursor-pointer font-semibold uppercase tracking-wider"
          >
            {t("card.types.ability")}
          </SelectItem>
          <SelectItem
            value={CardType.Spell}
            className="focus:bg-slate-700 focus:text-slate-100 cursor-pointer font-semibold uppercase tracking-wider"
          >
            {t("card.types.spell")}
          </SelectItem>
        </SelectGroup>

        <SelectGroup>
          <SelectLabel>{t("editor.propertiesTab.cardType.groups.items")}</SelectLabel>

          <SelectItem
            disabled
            value={CardType.Armor}
            className="focus:bg-slate-700 focus:text-slate-100 cursor-pointer font-semibold uppercase tracking-wider"
          >
            {t("card.types.armor")}
          </SelectItem>
          <SelectItem
            disabled
            value={CardType.Weapon}
            className="focus:bg-slate-700 focus:text-slate-100 cursor-pointer font-semibold uppercase tracking-wider"
          >
            {t("card.types.weapon")}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
