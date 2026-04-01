import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { useT } from "next-i18next/client";
import type { Card } from "@/features/cards/types";

export const TitleInput: React.FC = () => {
  const { register } = useFormContext<Card>();
  const { t } = useT();

  return (
    <div>
      <EditorLabel htmlFor="title">{t("editor.propertiesTab.cardName")}</EditorLabel>
      <Input
        id="title"
        {...register("title")}
        placeholder={t("editor.propertiesTab.cardName")}
        className="bg-slate-800 border-slate-700 text-slate-100 placeholder:text-slate-500 h-9"
      />
    </div>
  );
};

