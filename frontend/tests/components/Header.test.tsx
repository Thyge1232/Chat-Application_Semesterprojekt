import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "../../src/sharedComponents/Layout/Header";
import { BrowserRouter } from "react-router-dom";

describe("Header component", () => {
  it("Viser header med navigationsknapper når hidebuttons er false", () => {
    render(
      <BrowserRouter>
        <Header hideButtons={false} />
      </BrowserRouter>
    );
    const navButtons = screen.getByTestId("navbuttons");
    const headerElement = screen.getByTestId("header");
    const headerLogo = screen.getByTestId("headerlogo");
    const headerFrog = screen.getByTestId("headerfrog");
    expect(navButtons).toBeInTheDocument();
    expect(headerElement).toBeInTheDocument();
    expect(headerLogo).toBeInTheDocument();
    expect(headerFrog).toBeInTheDocument();
  });
  it("Viser header uden navigationsknapper når hidebuttons er true", () => {
    render(
      <BrowserRouter>
        <Header hideButtons={true} />
      </BrowserRouter>
    );
    const navButtons = screen.queryByTestId("navbuttons");
    const headerElement = screen.getByTestId("header");
    const headerLogo = screen.getByTestId("headerlogo");
    const headerFrog = screen.getByTestId("headerfrog");
    expect(navButtons).toBeNull();
    expect(headerElement).toBeInTheDocument();
    expect(headerLogo).toBeInTheDocument();
    expect(headerFrog).toBeInTheDocument();
  });
});
