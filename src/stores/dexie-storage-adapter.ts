import { getDb } from "@/lib/db/db";

const pending = new Map<string, { timer: ReturnType<typeof setTimeout>; value: string }>();
const DEBOUNCE_MS = 500;

export const dexieStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const db = getDb();
    const record = await db.kv.get(name);
    return record?.value ?? null;
  },

  setItem: async (name: string, value: string): Promise<void> => {
    const existing = pending.get(name);
    if (existing) {
      clearTimeout(existing.timer);
      pending.set(name, { timer: setTimeout(() => flush(name, value), DEBOUNCE_MS), value });
    } else {
      pending.set(name, { timer: setTimeout(() => flush(name, value), DEBOUNCE_MS), value });
    }
  },

  removeItem: async (name: string): Promise<void> => {
    const db = getDb();
    const existing = pending.get(name);
    if (existing) {
      clearTimeout(existing.timer);
      pending.delete(name);
    }
    await db.kv.delete(name);
  },
};

async function flush(name: string, value: string): Promise<void> {
  pending.delete(name);
  const db = getDb();
  await db.kv.put({ key: name, value });
}
