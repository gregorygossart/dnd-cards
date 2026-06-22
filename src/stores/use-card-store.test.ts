import { describe, it, expect, vi, beforeEach } from "vitest";
import "fake-indexeddb/auto";
import { useCardStore } from "@/stores/card-store";

// Mock the Dexie repo and local image cleanup
vi.mock("@/lib/db/cards-repo", () => ({
  createCard: vi.fn(),
  updateCard: vi.fn(),
  deleteCard: vi.fn(),
}));

vi.mock("@/lib/share/cardImages", () => ({
  deleteCardLocalImageRefs: vi.fn(),
}));

import { createCard, updateCard, deleteCard as deleteCardRepo } from "@/lib/db/cards-repo";

const mockedCreateCard = createCard as ReturnType<typeof vi.fn>;
const mockedUpdateCard = updateCard as ReturnType<typeof vi.fn>;
const mockedDeleteCard = deleteCardRepo as ReturnType<typeof vi.fn>;

describe("useCardStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useCardStore.setState({ cards: [], selectedCardId: null });
  });

  it("addCard creates card with correct deckId", async () => {
    const createdId = "card-1";
    mockedCreateCard.mockResolvedValue({
      id: createdId,
      deckId: "deck-1",
      type: "spell",
      name: "Fireball",
      level: 3,
      school: "Evocation",
      castingTime: "1 action",
      range: "150 feet",
      components: '{"verbal":true,"somatic":true,"material":"sulfur"}',
      duration: "Instantaneous",
      description: "Boom.",
      accentColor: "#ff4400",
      createdAt: 1000,
      updatedAt: 1000,
    });

    await useCardStore.getState().addCard("deck-1", {
      name: "Fireball",
      level: 3,
      school: "Evocation",
      castingTime: "1 action",
      range: "150 feet",
      components: { verbal: true, somatic: true, material: true, materialText: "sulfur" },
      duration: "Instantaneous",
      description: "Boom.",
      accentColor: "#ff4400",
    });

    const state = useCardStore.getState();
    expect(state.cards).toHaveLength(1);
    expect(state.cards[0].deckId).toBe("deck-1");
    expect(state.cards[0].name).toBe("Fireball");
    expect(state.selectedCardId).toBe(state.cards[0].id);
  });

  it("updateCard patches fields immutably", async () => {
    useCardStore.setState({
      cards: [
        {
          id: "card-1",
          deckId: "deck-1",
          type: "spell",
          name: "Old Name",
          level: 0,
          school: "Evocation",
          castingTime: "-",
          range: "-",
          components: { verbal: false, somatic: false, material: false },
          duration: "-",
          description: "-",
          accentColor: "#000",
          createdAt: 1000,
          updatedAt: 1000,
          order: 0,
        },
      ],
      selectedCardId: null,
    });

    mockedUpdateCard.mockResolvedValue({
      id: "card-1",
      deckId: "deck-1",
      type: "spell",
      name: "New Name",
      level: 0,
      school: "Evocation",
      castingTime: "-",
      range: "-",
      components: '{"verbal":false,"somatic":false,"material":false}',
      duration: "-",
      description: "-",
      accentColor: "#000",
      createdAt: 1000,
      updatedAt: 2000,
    });

    await useCardStore.getState().updateCard("card-1", { name: "New Name" });

    expect(useCardStore.getState().cards[0].name).toBe("New Name");
    expect(mockedUpdateCard).toHaveBeenCalledWith("card-1", expect.objectContaining({ name: "New Name" }));
  });

  it("deleteCard removes card and clears selectedCardId", async () => {
    useCardStore.setState({
      cards: [
        {
          id: "card-1",
          deckId: "deck-1",
          type: "spell",
          name: "Fireball",
          level: 3,
          school: "Evocation",
          castingTime: "1 action",
          range: "150 feet",
          components: { verbal: true, somatic: true, material: true },
          duration: "Instantaneous",
          description: "Boom.",
          accentColor: "#ff4400",
          createdAt: 1000,
          updatedAt: 1000,
          order: 0,
        },
      ],
      selectedCardId: "card-1",
    });

    mockedDeleteCard.mockResolvedValue(undefined);

    await useCardStore.getState().deleteCard("card-1");

    expect(useCardStore.getState().cards).toHaveLength(0);
    expect(useCardStore.getState().selectedCardId).toBeNull();
    expect(mockedDeleteCard).toHaveBeenCalledWith("card-1");
  });

  it("reorderCards reorders array correctly", async () => {
    useCardStore.setState({
      cards: [
        {
          id: "a",
          deckId: "deck-1",
          type: "spell",
          name: "A",
          level: 0,
          school: "Evocation",
          castingTime: "-",
          range: "-",
          components: { verbal: false, somatic: false, material: false },
          duration: "-",
          description: "-",
          accentColor: "#000",
          createdAt: 1000,
          updatedAt: 1000,
          order: 0,
        },
        {
          id: "b",
          deckId: "deck-1",
          type: "spell",
          name: "B",
          level: 0,
          school: "Evocation",
          castingTime: "-",
          range: "-",
          components: { verbal: false, somatic: false, material: false },
          duration: "-",
          description: "-",
          accentColor: "#000",
          createdAt: 1000,
          updatedAt: 1000,
          order: 1,
        },
      ],
      selectedCardId: null,
    });

    await useCardStore.getState().reorderCards("deck-1", 0, 1);

    const ids = useCardStore.getState().cards.map((c) => c.id);
    expect(ids).toEqual(["b", "a"]);
  });
});