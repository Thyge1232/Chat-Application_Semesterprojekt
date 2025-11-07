import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { displayError } from "../../src/sharedComponents/Error";

describe("displayError", () => {
  const error = new Error("Noget fejledde");

  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("skriver error til konsolen", () => {
    displayError(error);
    expect(console.log).toHaveBeenCalledWith(error);
  });

  it("viser fejlbeskeden", () => {
    displayError(error);
    expect(window.alert).toHaveBeenCalledWith(
      "Noget gik galt: " + error.message
    );
  });

  it("returns an image element with correct attributes", () => {
    const { container } = render(displayError(error));
    const img = screen.getByAltText("error");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "Images/Error.png");
    expect(img).toHaveClass("h-160 w-160");
    expect(container).toMatchSnapshot();
  });
});
