import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditorLabel } from "@/components/RightSidebar/CardEditor/EditorLabel/EditorLabel";
import { useT } from "next-i18next/client";
import type { Card } from "@/features/cards/types";
import {
  LOCAL_IMAGE_PREFIX,
  compressImageFileToJpegBlob,
  deleteImageBlob,
  getLocalImageId,
  isLocalImageRef,
  putImageBlob,
} from "@/lib/share/cardImages";
import { useResolvedImageUrl } from "@/hooks/useResolvedImageUrl";

interface ImageInputProps {
  fieldName: "visuals.headerImage" | "visuals.backImage";
  label?: string;
}

function deleteLocalRefIfPresent(value: string | undefined): void {
  if (!isLocalImageRef(value)) return;
  void deleteImageBlob(getLocalImageId(value));
}

export const ImageInput: React.FC<ImageInputProps> = ({
  fieldName,
  label,
}) => {
  const { watch, setValue, getValues } = useFormContext<Card>();
  const { t } = useT();
  const value = watch(fieldName);
  const previewUrl = useResolvedImageUrl(value);

  const setFieldValue = (next: string | undefined, previous: string | undefined) => {
    if (previous !== next) {
      deleteLocalRefIfPresent(previous);
    }
    setValue(fieldName, next);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    void (async () => {
      const previous = getValues(fieldName) as string | undefined;
      try {
        const blob = await compressImageFileToJpegBlob(file);
        const id = crypto.randomUUID();
        await putImageBlob(id, blob);
        setFieldValue(`${LOCAL_IMAGE_PREFIX}${id}`, previous);
      } catch (err) {
        console.error(err);
      }
    })();
  };

  const inputId = fieldName.replace(".", "-");
  const displayUrlValue =
    value && !isLocalImageRef(value) ? value : "";

  return (
    <div>
      <EditorLabel htmlFor={inputId}>
        {label || t("editor.visualStyle.headerImage")}
      </EditorLabel>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            id={`${inputId}-url`}
            value={displayUrlValue}
            onChange={(e) => {
              const previous = watch(fieldName) as string | undefined;
              const raw = e.target.value.trim();
              setFieldValue(raw || undefined, previous);
            }}
            placeholder={t("editor.image.placeholder")}
            className="flex-1 bg-slate-800 border-slate-700 text-slate-100 text-xs placeholder:text-slate-500"
          />
          <input
            id={`${inputId}-file`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById(`${inputId}-file`)?.click()}
            type="button"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-100 h-9 text-xs px-3"
          >
            {t("common.browse")}
          </Button>
        </div>
        {previewUrl && (
          <div className="rounded border border-slate-700 overflow-hidden bg-slate-900 max-h-32">
            <img
              src={previewUrl}
              alt=""
              className="w-full h-full max-h-32 object-contain"
            />
          </div>
        )}
        {value && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const previous = watch(fieldName) as string | undefined;
              setFieldValue(undefined, previous);
            }}
            type="button"
            className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-100 h-7 text-xs w-full"
          >
            {t("editor.image.clear")}
          </Button>
        )}
      </div>
    </div>
  );
};
