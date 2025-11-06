import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Spinner } from "../../src/sharedComponents/Spinner";

describe("Spinneren", () => {
  it("viser en spinner", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("presentation", { hidden: true });
    expect(spinner).toBeInTheDocument();
  });

  it("anvender tailwind indstillingerne, vi har valgt", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("presentation", { hidden: true });
    expect(spinner).toHaveClass(
      "border-green-700",
      "mx-auto",
      "my-20",
      "aspect-square",
      "w-16",
      "animate-spin",
      "rounded-full",
      "border-4",
      "border-t-transparent"
    );
  });
});
