# Deferred Work

## Deferred from: code review of 1-2-dexie-schema-database-instance (2026-06-21)

- **Tests share single db instance — fragile for write tests** [src/lib/db/schema.test.ts:7-9] — The `beforeAll` block creates one `db` instance shared across all 8 tests. While current tests are read-only (schema introspection), any future write-based test would suffer from cross-test contamination. Should use `beforeEach` to recreate the instance when write tests are added.