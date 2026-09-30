import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeContextProvider } from "@/context/theme-provider";
import { useTheme } from "next-themes";

// Stub next-themes to avoid the localStorage attribute bookkeeping that
// the real package does in jsdom (avoids "Cannot read properties of null").
vi.mock("next-themes", async () => {
  const actual =
    await vi.importActual<typeof import("next-themes")>("next-themes");
  return actual;
});

function Probe() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{String(theme ?? "")}</span>
      <span data-testid="resolved">{String(resolvedTheme ?? "")}</span>
      <button onClick={() => setTheme("dark")}>set-dark</button>
    </div>
  );
}

describe("ThemeContextProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders children with the next-themes provider context", () => {
    render(
      <ThemeContextProvider attribute="class" defaultTheme="light">
        <Probe />
      </ThemeContextProvider>,
    );
    // Initial state — theme is set by the provider but no theme value yet (server side).
    expect(screen.getByTestId("theme")).toBeInTheDocument();
  });

  it("persists theme choice to localStorage when set", async () => {
    const user = userEvent.setup();
    render(
      <ThemeContextProvider attribute="class" defaultTheme="light">
        <Probe />
      </ThemeContextProvider>,
    );
    await user.click(screen.getByText("set-dark"));
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});