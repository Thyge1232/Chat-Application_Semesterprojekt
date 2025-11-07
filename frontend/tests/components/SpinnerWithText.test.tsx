import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SpinnerWithText } from "../../src/sharedComponents/SpinnerWithText";

describe("Mini spinner", () => {
  it("viser en mini spinner med tailwind indstillingerne, vi har valgt", () => {
    render(<SpinnerWithText />);
    const spinner = screen.getByTestId("SpinnerWithText");
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("SpinnerIcon");
    expect(button).toHaveClass("flex", "bg-blue-600", "text-white");
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(
      screen.getByText("Loader... vi krydser fingre for at serveren er med os!")
    ).toBeInTheDocument();
    expect(icon).toHaveClass("h-5", "w-5", "animate-spin");
  });
});
