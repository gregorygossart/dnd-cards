/**
 * Local card images (browser only)
 * ================================
 *
 * Problem: huge base64 strings in card JSON fill localStorage fast.
 *
 * What we do instead:
 * - **URL** (http/https or a path): stored on the card as the string — nothing special.
 * - **Uploaded file**: we save pixels in **IndexedDB** and store only `idb:<uuid>` on the card
 *   (short string in persisted JSON).
 *
 * This file is the single place for: opening the image DB, shrinking files before save,
 * recognizing `idb:` refs, and updating `Card` objects for export (inline images), duplicate, and delete.
 */

import type { Card } from "@/features/cards/types";
import type { CardVisuals } from "@/features/cards/types";

// -----------------------------------------------------------------------------
// 1. IndexedDB — binary blobs (large), separate from localStorage
// -----------------------------------------------------------------------------

const DB_NAME = "dnd-cards-images";
const DB_VERSION = 1;
const STORE_NAME = "blobs";

let dbPromise: Promise<IDBDatabase> | null = null;

/** Opens (and creates on first run) the database that holds uploaded images. */
function openImageDatabase(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("indexedDB is not available"));
  }
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  }
  return dbPromise;
}

/** Saves or overwrites one image under a UUID key. */
export async function putImageBlob(id: string, blob: Blob): Promise<void> {
  const db = await openImageDatabase();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.objectStore(STORE_NAME).put(blob, id);
  });
}

/** Loads one image blob by UUID, or undefined if missing. */
export async function getImageBlob(id: string): Promise<Blob | undefined> {
  const db = await openImageDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(id);
    request.onsuccess = () => resolve(request.result as Blob | undefined);
    request.onerror = () => reject(request.error);
  });
}

/** Removes one stored image (call when the card no longer references it). */
export async function deleteImageBlob(id: string): Promise<void> {
  const db = await openImageDatabase();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.objectStore(STORE_NAME).delete(id);
  });
}

// -----------------------------------------------------------------------------
// 2. Resize + JPEG — keeps uploads smaller before they hit IndexedDB
// -----------------------------------------------------------------------------

const MAX_EDGE_PX = 1600;
const JPEG_QUALITY = 0.88;

/**
 * Draws the image to a canvas (optionally downscaled) and encodes as JPEG.
 * Used for new uploads and when copying an existing stored image.
 */
async function blobToCompressedJpeg(source: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(source);
  try {
    let width = bitmap.width;
    let height = bitmap.height;
    const longest = Math.max(width, height);
    if (longest > MAX_EDGE_PX) {
      const scale = MAX_EDGE_PX / longest;
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas 2D context unavailable");
    }
    ctx.drawImage(bitmap, 0, 0, width, height);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Image encoding failed"))),
        "image/jpeg",
        JPEG_QUALITY,
      );
    });
  } finally {
    bitmap.close();
  }
}

/** Entry point from the file picker: same as blobToCompressedJpeg, reads the File as a blob. */
export async function compressImageFileToJpegBlob(file: File): Promise<Blob> {
  return blobToCompressedJpeg(file);
}

// -----------------------------------------------------------------------------
// 3. The `idb:` reference format (what gets saved on the card JSON)
// -----------------------------------------------------------------------------

/** Prefix stored in `visuals.headerImage` / `visuals.backImage` for IndexedDB-backed art. */
export const LOCAL_IMAGE_PREFIX = "idb:";

/** True if this string points at our IndexedDB row (not a URL). */
export function isLocalImageRef(value: string | undefined): value is string {
  return typeof value === "string" && value.startsWith(LOCAL_IMAGE_PREFIX);
}

/** UUID part after `idb:`. */
export function getLocalImageId(ref: string): string {
  return ref.slice(LOCAL_IMAGE_PREFIX.length);
}

// -----------------------------------------------------------------------------
// 4. Card helpers — what components and the deck store actually call
// -----------------------------------------------------------------------------

/**
 * If `value` is an `idb:` ref, delete that blob (fire-and-forget is OK for cleanup).
 * No-op for URLs, presets, or empty values.
 */
export function deleteBlobIfLocalRef(value: string | undefined): void {
  if (!isLocalImageRef(value)) return;
  void deleteImageBlob(getLocalImageId(value));
}

/**
 * Duplicate card: copy each `idb:` image to a new UUID so editing one card
 * does not affect the other.
 */
export async function cloneCardLocalImageRefs(card: Card): Promise<Card> {
  const visuals = card.visuals;
  let headerImage = visuals.headerImage;
  let backImage = visuals.backImage;

  if (isLocalImageRef(headerImage)) {
    headerImage = await copyIndexedImageToNewId(headerImage);
  }
  if (isLocalImageRef(backImage)) {
    backImage = await copyIndexedImageToNewId(backImage);
  }

  if (headerImage === visuals.headerImage && backImage === visuals.backImage) {
    return card;
  }

  return {
    ...card,
    visuals: { ...visuals, headerImage, backImage },
  };
}

/** Reads an existing blob, recompresses, stores under a new id, returns the new ref. */
async function copyIndexedImageToNewId(ref: string): Promise<string> {
  const oldId = getLocalImageId(ref);
  const existing = await getImageBlob(oldId);
  if (!existing) {
    return ref;
  }
  const jpeg = await blobToCompressedJpeg(existing);
  const newId = crypto.randomUUID();
  await putImageBlob(newId, jpeg);
  return `${LOCAL_IMAGE_PREFIX}${newId}`;
}

/** Delete both art blobs when removing a card or deck. */
export function deleteCardLocalImageRefs(card: Card): void {
  deleteBlobIfLocalRef(card.visuals.headerImage);
  deleteBlobIfLocalRef(card.visuals.backImage);
}

/**
 * Export JSON should be shareable: turn `idb:` refs back into `data:` so the file is self-contained.
 */
async function localRefToDataUrl(value: string | undefined): Promise<string | undefined> {
  if (!value || !isLocalImageRef(value)) {
    return value;
  }
  const blob = await getImageBlob(getLocalImageId(value));
  if (!blob) {
    return undefined;
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Same as localRefToDataUrl but for both card art fields at once. */
export async function resolveVisualsForExport(visuals: CardVisuals): Promise<CardVisuals> {
  const headerImage = await localRefToDataUrl(visuals.headerImage);
  const backImage = await localRefToDataUrl(visuals.backImage);
  return { ...visuals, headerImage, backImage };
}

/** Full card with export-friendly visuals (data URLs instead of idb refs). */
export async function resolveCardForExport(card: Card): Promise<Card> {
  const visuals = await resolveVisualsForExport(card.visuals);
  return { ...card, visuals };
}
