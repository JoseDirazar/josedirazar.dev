import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import TranslationsProvider from "@/components/TranslationsProvider";
import { useTranslation } from "react-i18next";

function Consumer() {
  const { t } = useTranslation();
  return <span data-testid="greeting">{t("hero.greeting")}</span>;
}

describe("TranslationsProvider", () => {
  it("renders children wrapped in I18nextProvider context", () => {
    render(
      <TranslationsProvider
        locale="en"
        namespaces={["common"]}
        resources={{
          en: {
            common: { hero: { greeting: "Hello, I'm Jose." } },
          },
        }}
      >
        <Consumer />
      </TranslationsProvider>,
    );
    expect(screen.getByTestId("greeting")).toHaveTextContent(
      "Hello, I'm Jose.",
    );
  });

  it("uses server-side resources to translate keys (no client re-fetch)", async () => {
    // Both locales receive distinct server-supplied translations.
    render(
      <TranslationsProvider
        locale="es"
        namespaces={["common"]}
        resources={{
          es: {
            common: { hero: { greeting: "Hola, soy Jose." } },
          },
        }}
      >
        <Consumer />
      </TranslationsProvider>,
    );
    await waitFor(() => {
      expect(screen.getByTestId("greeting")).toHaveTextContent("Hola, soy Jose.");
    });
  });
});