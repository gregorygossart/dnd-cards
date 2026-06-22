import { describe, it, expect, vi, beforeEach } from "vitest";
import "fake-indexeddb/auto";
import { useUiStore } from "@/stores/ui-store";

describe("useUiStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUiStore.setState({
      view: "grid",
      theme: "default",
      density: "standard",
    });
  });

  it("setView updates the view slice", () => {
    useUiStore.getState().setView("editor");
    expect(useUiStore.getState().view).toBe("editor");
  });

  it("setTheme updates the theme slice", () => {
    useUiStore.getState().setTheme("dark");
    expect(useUiStore.getState().theme).toBe("dark");
  });

  it("setDensity updates the density slice", () => {
    useUiStore.getState().setDensity("compact");
    expect(useUiStore.getState().density).toBe("compact");
  });

  it("setSelectedCardId updates selectedCardId", () => {
    useUiStore.getState().setSelectedCardId("card-1");
    expect(useUiStore.getState().selectedCardId).toBe("card-1");
  });

  it("selectedCardId resets to null on setSelectedCardId(null)", () => {
    useUiStore.getState().setSelectedCardId("card-1");
    useUiStore.getState().setSelectedCardId(null);
    expect(useUiStore.getState().selectedCardId).toBeNull();
  });
});
