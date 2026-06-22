import { describe, it, expect, vi, beforeEach } from "vitest";
import "fake-indexeddb/auto";
import { useDeckStore } from "@/stores/deck-store";

// Mock the Dexie repo
vi.mock("@/lib/db/decks-repo", () => ({
  createDeck: vi.fn(),
  updateDeck: vi.fn(),
  deleteDeck: vi.fn(),
}));

import { createDeck, updateDeck, deleteDeck } from "@/lib/db/decks-repo";

const mockedCreateDeck = createDeck as ReturnType<typeof vi.fn>;
const mockedUpdateDeck = updateDeck as ReturnType<typeof vi.fn>;
const mockedDeleteDeck = deleteDeck as ReturnType<typeof vi.fn>;

describe("useDeckStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useDeckStore.setState({ decks: [], activeDeckId: null });
  });

  it("addDeck creates a deck with generated id and timestamps", async () => {
    mockedCreateDeck.mockResolvedValue({
      id: "db-1",
      settings: '{"format":"poker","density":"standard"}',
      cardFormat: "poker",
      densityPreset: "standard",
      name: "My Deck",
      createdAt: 1000,
      updatedAt: 1000,
    });

    await useDeckStore.getState().addDeck("My Deck");

    const state = useDeckStore.getState();
    expect(state.decks).toHaveLength(1);
    expect(state.decks[0].name).toBe("My Deck");
    expect(state.activeDeckId).toBe("db-1");
    expect(mockedCreateDeck).toHaveBeenCalledTimes(1);
    expect(mockedCreateDeck).toHaveBeenCalledWith(
      expect.objectContaining({ name: "My Deck" }),
    );
  });

  it("renameDeck updates name in state and calls repo", async () => {
    useDeckStore.setState({
      decks: [
        {
          id: "deck-1",
          name: "Old",
          settings: { format: "poker", density: "standard" },
          createdAt: 1000,
          updatedAt: 1000,
        },
      ],
      activeDeckId: "deck-1",
    });

    mockedUpdateDeck.mockResolvedValue({
      id: "deck-1",
      settings: '{"format":"poker","density":"standard"}',
      cardFormat: "poker",
      densityPreset: "standard",
      name: "New",
      createdAt: 1000,
      updatedAt: 2000,
    });

    await useDeckStore.getState().renameDeck("deck-1", "New");

    expect(useDeckStore.getState().decks[0].name).toBe("New");
    expect(mockedUpdateDeck).toHaveBeenCalledWith("deck-1", { name: "New" });
  });

  it("deleteDeck removes deck and clears activeDeckId if matching", async () => {
    useDeckStore.setState({
      decks: [
        {
          id: "deck-1",
          name: "A",
          settings: { format: "poker", density: "standard" },
          createdAt: 1000,
          updatedAt: 1000,
        },
        {
          id: "deck-2",
          name: "B",
          settings: { format: "poker", density: "standard" },
          createdAt: 1000,
          updatedAt: 1000,
        },
      ],
      activeDeckId: "deck-1",
    });

    mockedDeleteDeck.mockResolvedValue(undefined);

    await useDeckStore.getState().deleteDeck("deck-1");

    const state = useDeckStore.getState();
    expect(state.decks).toHaveLength(1);
    expect(state.decks[0].id).toBe("deck-2");
    expect(state.activeDeckId).toBeNull();
    expect(mockedDeleteDeck).toHaveBeenCalledWith("deck-1");
  });

  it("setActiveDeck updates activeDeckId", () => {
    useDeckStore.setState({
      decks: [
        {
          id: "deck-1",
          name: "A",
          settings: { format: "poker", density: "standard" },
          createdAt: 1000,
          updatedAt: 1000,
        },
      ],
      activeDeckId: null,
    });

    useDeckStore.getState().setActiveDeck("deck-1");

    expect(useDeckStore.getState().activeDeckId).toBe("deck-1");
  });
});