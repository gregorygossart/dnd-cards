import { useT } from "next-i18next/client";
import { ImportButton } from "./ImportButton";
import { AddDeckButton } from "./AddDeckButton";
import { Logo } from "@/components/Logo/Logo";

export function PageHeader() {
  const { t } = useT();

  return (
    <header className="z-20 h-14 shrink-0 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4 lg:px-6 space-x-4">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <Logo />
        <span className="text-slate-500">/</span>
        <span className="text-slate-300 truncate">{t("navigation.myDecks")}</span>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <ImportButton />
        <AddDeckButton />
      </div>
    </header>
  );
}
