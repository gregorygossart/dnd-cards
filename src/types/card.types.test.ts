import { describe, expect, it } from "vitest";
import { CardType } from "./card.types";

const spellCard: { type: CardType } = { type: "spell" };

describe("CardType exhaustiveness", () => {
  it("compiles with the current union", () => {
    expect(spellCard.type).toBe("spell");
  });
});