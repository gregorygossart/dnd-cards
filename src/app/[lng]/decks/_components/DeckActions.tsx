import { useT } from "next-i18next/client";
import { MoreVertical, Download, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DeckActionsProps {
  onExport: () => void;
  onDelete: () => void;
}

export function DeckActions({ onExport, onDelete }: DeckActionsProps) {
  const { t } = useT();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-slate-200">
          <MoreVertical className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
        <DropdownMenuItem
          onClick={onExport}
          className="text-slate-200 focus:bg-slate-800 focus:text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          {t("share.export")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="text-red-400 focus:bg-slate-800 focus:text-red-300"
        >
          <Trash2 className="w-4 h-4 mr-2 text-red-400" />
          {t("deck.actions.delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
