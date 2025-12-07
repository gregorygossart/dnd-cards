import { describe, it, expect } from "vitest";
import { CardSchema, CardType } from "@/types/card";

describe("CardSchema", () => {
  it("validates a minimal valid card", () => {
    const validCard = {
      title: "Test Card",
      type: CardType.Item,
      blocks: [],
      visuals: {},
    };
    const result = CardSchema.safeParse(validCard);
    expect(result.success).toBe(true);
  });

  it("validates a full card with blocks", () => {
    const validCard = {
      title: "Fireball",
      type: CardType.Spell,
      blocks: [
        {
          type: "text",
          content: "A bright streak flashes from your pointing finger.",
        },
      ],
      visuals: {},
    };
    const result = CardSchema.safeParse(validCard);
    expect(result.success).toBe(true);
  });

  it("fails validation when title is missing", () => {
    const invalidCard = {};
    const result = CardSchema.safeParse(invalidCard);
    expect(result.success).toBe(false);
  });
});
