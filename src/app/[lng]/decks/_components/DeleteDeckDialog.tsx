import { useT } from "next-i18next/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteDeckDialogProps {
  deck: { id: string; name: string; cardCount: number } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDeckDialog({
  deck,
  onConfirm,
  onCancel,
}: DeleteDeckDialogProps) {
  const { t } = useT();

  return (
    <AlertDialog
      open={!!deck}
      onOpenChange={(open) => !open && onCancel()}
    >
      <AlertDialogContent className="bg-slate-900 border-slate-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-100">
            {t("deck.deletePopup.title")}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            {t("deck.deletePopup.description", {
              deckName: deck?.name,
              cardCount: deck?.cardCount,
            })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700">
            {t("common.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {t("deck.actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
