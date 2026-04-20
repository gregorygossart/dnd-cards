import { useT } from "next-i18next/client";
import { ImportButton } from "./ImportButton";
import { AddDeckButton } from "./AddDeckButton";
import { Logo } from "@/components/Logo/Logo";

export function PageHeader() {
  const { t } = useT();

  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <span className="text-slate-500">/</span>
          <span className="text-slate-300">{t("navigation.myDecks")}</span>
        </div>
        <div className="flex items-center gap-2">
          <ImportButton />
          <AddDeckButton />
        </div>
      </div>
    </header>
  );
}
