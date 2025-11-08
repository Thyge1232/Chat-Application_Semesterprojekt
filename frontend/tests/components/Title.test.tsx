import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Title } from "../../src/sharedComponents/Title";

describe("Title component", () => {
  it("viser titlen med de korrekte tailwind klasser", () => {
    render(<Title>Test Titel</Title>);
    const titleElement = screen.getByText("Test Titel");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(
      "m-5",
      "text-center",
      "font-sans",
      "text-5xl"
    );
  });
});
