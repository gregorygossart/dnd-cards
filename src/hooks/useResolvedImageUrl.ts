import { useEffect, useState } from "react";
import {
  getImageBlob,
  getLocalImageId,
  isLocalImageRef,
} from "@/lib/cardImages";

/** Turns `idb:…` values from the card into a temporary `blob:` URL for `<img>` / CSS. See `cardImages.ts`. */
export function useResolvedImageUrl(src: string | undefined): string | undefined {
  const [url, setUrl] = useState<string | undefined>(() =>
    src && !isLocalImageRef(src) ? src : undefined,
  );

  useEffect(() => {
    if (!src) {
      setUrl(undefined);
      return;
    }
    if (!isLocalImageRef(src)) {
      setUrl(src);
      return;
    }

    let revoked: string | undefined;
    let cancelled = false;

    (async () => {
      const blob = await getImageBlob(getLocalImageId(src));
      if (cancelled) return;
      if (!blob) {
        setUrl(undefined);
        return;
      }
      const objectUrl = URL.createObjectURL(blob);
      revoked = objectUrl;
      setUrl(objectUrl);
    })();

    return () => {
      cancelled = true;
      if (revoked) URL.revokeObjectURL(revoked);
    };
  }, [src]);

  return url;
}
