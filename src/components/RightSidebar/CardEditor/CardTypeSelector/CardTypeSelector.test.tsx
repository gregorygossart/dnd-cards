import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardTypeSelector } from "@/components/CardEditor/CardTypeSelector/CardTypeSelector";
import { CardType } from "@/types/card";

describe("CardTypeSelector", () => {
  it("renders the label and select trigger", () => {
    const onChange = vi.fn();
    render(<CardTypeSelector value={CardType.Item} onChange={onChange} />);

    expect(screen.getByText("Card Type")).toBeDefined();
    expect(screen.getByRole("combobox")).toBeDefined();
  });

  it("displays the current value", () => {
    const onChange = vi.fn();
    render(<CardTypeSelector value={CardType.Spell} onChange={onChange} />);

    expect(screen.getByText(CardType.Spell)).toBeDefined();
  });

  it("renders with Item type", () => {
    const onChange = vi.fn();
    render(<CardTypeSelector value={CardType.Item} onChange={onChange} />);

    expect(screen.getByText(CardType.Item)).toBeDefined();
  });
});
