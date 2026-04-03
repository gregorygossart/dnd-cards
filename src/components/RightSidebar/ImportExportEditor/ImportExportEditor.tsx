import React, { useState, useEffect, useCallback } from "react";
import type { Card } from "@/features/cards/types";
import { CardSchema } from "@/features/cards/types";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check, AlertCircle } from "lucide-react";
import { useT } from "next-i18next/client";
import { useDebounce } from "@/hooks/useDebounce";
import { resolveCardForExport } from "@/lib/cardImages";

interface ImportExportEditorProps {
  data: Card;
  onChange: (data: Card) => void;
}

export const ImportExportEditor: React.FC<ImportExportEditorProps> = ({
  data,
  onChange,
}) => {
  const [jsonText, setJsonText] = useState("");
  const [dataExportJson, setDataExportJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t } = useT();

  const debouncedJsonText = useDebounce(jsonText, 500);

  useEffect(() => {
    let cancelled = false;
    resolveCardForExport(data).then((resolved) => {
      if (cancelled) return;
      const s = JSON.stringify(resolved, null, 2);
      setDataExportJson(s);
      setJsonText(s);
    });
    return () => {
      cancelled = true;
    };
  }, [data]);

  useEffect(() => {
    if (!debouncedJsonText || !dataExportJson) return;
    if (debouncedJsonText === dataExportJson) return;

    try {
      const parsed = JSON.parse(debouncedJsonText);
      const result = CardSchema.safeParse(parsed);

      if (result.success) {
        if (JSON.stringify(result.data) !== JSON.stringify(data)) {
          onChange(result.data);
          setError(null);
          setSaved(true);
        }
      } else {
        const firstError = result.error.issues[0];
        const fieldPath =
          firstError.path.length > 0 ? firstError.path.join(".") : "root";
        setError(`${fieldPath}: ${firstError.message}`);
        setSaved(false);
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e);
        setError(e.message);
      } else {
        setError(t("editor.importExportTab.status.unknownError"));
      }
      setSaved(false);
    }
  }, [debouncedJsonText, dataExportJson, data, onChange, t]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [jsonText]);

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-slate-300 font-semibold text-sm">
          {t("editor.importExportTab.title")}
        </h3>
        <Button
          size="icon-sm"
          variant="outline"
          onClick={handleCopy}
          className="h-7 w-7"
          title={t("editor.importExportTab.copyTitle")}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>

      {/* Editor */}
      <Textarea
        value={jsonText}
        onChange={(e) => {
          setJsonText(e.target.value);
          if (error) setError(null);
          if (saved) setSaved(false);
        }}
        className="flex-1 font-mono text-xs bg-slate-950 border-slate-800 text-slate-300 placeholder:text-slate-600 focus-visible:ring-slate-500 resize-none"
        placeholder={t("editor.importExportTab.placeholder")}
      />

      {/* Status */}
      <div className="min-h-[24px] flex items-center">
        {saved && (
          <div className="flex items-center gap-1.5 text-xs text-green-400">
            <Check className="h-3.5 w-3.5" />
            <span>{t("editor.importExportTab.status.saved")}</span>
          </div>
        )}
        {error && (
          <div className="flex items-center gap-1.5 text-xs text-red-400">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
