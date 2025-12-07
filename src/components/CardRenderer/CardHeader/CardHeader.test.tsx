import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardHeader } from "@/components/CardRenderer/CardHeader/CardHeader";

describe("CardHeader", () => {
  it("renders title", () => {
    render(<CardHeader title="Fireball" />);
    expect(screen.getByText("Fireball")).toBeDefined();
  });

  it("renders title in uppercase", () => {
    render(<CardHeader title="fireball" />);
    const heading = screen.getByRole("heading");
    expect(heading.className).toContain("uppercase");
  });
});
