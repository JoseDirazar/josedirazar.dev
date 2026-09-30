import "@testing-library/jest-dom";
import { vi } from "vitest";

// jsdom does not implement matchMedia; next-themes uses it to detect the OS theme.
// Stub it so ThemeContextProvider can mount under the test environment.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});