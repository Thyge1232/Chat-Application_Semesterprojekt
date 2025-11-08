import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Layout } from "../../src/sharedComponents/Layout/Layout";
import { MemoryRouter } from "react-router-dom";

describe("Layout wrapperen", () => {
  it("Rendrer Layout komponenten korrekt på fanen '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Layout>Test Indhold</Layout>
      </MemoryRouter>
    );
    const contentElement = screen.getByText("Test Indhold");
    expect(contentElement).toBeInTheDocument();
  });
  it("Rendrer Layout komponenten korrekt på fanen '/signup'", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Layout>Test Indhold</Layout>
      </MemoryRouter>
    );
    const contentElement = screen.getByText("Test Indhold");
    expect(contentElement).toBeInTheDocument();
  });
});
