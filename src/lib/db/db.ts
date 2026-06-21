import { TomeForgeDB } from "./schema";

let dbInstance: TomeForgeDB | null = null;

/**
 * Returns the singleton TomeForgeDB (Dexie) instance.
 * Lazily created on first access so that importing this module
 * does not crash on the server (where indexedDB is unavailable).
 */
export function getDb(): TomeForgeDB {
  if (!dbInstance) {
    dbInstance = new TomeForgeDB();
  }
  return dbInstance;
}
