import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "../../src/sharedComponents/Layout/Footer";
import { BrowserRouter } from "react-router-dom";

describe("Footer component", () => {
  it("Viser footer med knapper når hidebuttons er false", () => {
    render(
      <BrowserRouter>
        <Footer hideButtons={false} />
      </BrowserRouter>
    );
    const buttonElement = screen.getByText("Log ud");
    const footerText = screen.getByText("semesterprojekt gruppe 5 SWT");
    const linkElement = screen.getByTestId("footerlink");
    expect(buttonElement).toBeInTheDocument();
    expect(footerText).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it("Viser footer uden knapper når hidebuttons er true", () => {
    render(
      <BrowserRouter>
        <Footer hideButtons={true} />
      </BrowserRouter>
    );
    const buttonElement = screen.queryByText("Log ud");
    const footerText = screen.getByText("semesterprojekt gruppe 5 SWT");
    const linkElement = screen.queryByTestId("footerlink");
    expect(buttonElement).toBeNull();
    expect(footerText).toBeInTheDocument();
    expect(linkElement).toBeNull();
  });
});
