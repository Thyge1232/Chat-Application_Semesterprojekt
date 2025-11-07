import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SpinnerMini } from "../../src/sharedComponents/SpinnerMini";

describe("Mini spinner", () => {
  it("viser en mini spinner med tailwind indstillingerne, vi har valgt", () => {
    render(<SpinnerMini />);
    const spinner = screen.getByTestId("spinnerMini");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("h-6", "w-6", "animate-spin", "text-gray-700");
  });
});
