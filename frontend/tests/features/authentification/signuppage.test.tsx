import { Signup } from "../../../src/features/authentication/pages/Signup";
import * as useSignup from "../../../src/features/authentication/hooks/useSignup";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

//evt en test med invalid data

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return { ...actual, useNavigate: () => navigateMock };
});

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

const createUserMutation = vi.fn();

describe("Signup page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    navigateMock.mockReset();
    createUserMutation.mockReset();
  });
  it("allows the user to type into username, email, password and confirmPassword", () => {
    render(<Signup />, { wrapper });

    const usernameInput = screen.getByLabelText("Brugernavn:");
    const emailInput = screen.getByLabelText("Email:");
    const passwordInput = screen.getByLabelText("Kodeord:");
    const confirmPasswordInput = screen.getByLabelText("Gentag kodeord:");

    fireEvent.change(usernameInput, { target: { value: "User123" } });
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password1!" } });

    expect(usernameInput).toHaveValue("User123");
    expect(emailInput).toHaveValue("user@example.com");
    expect(passwordInput).toHaveValue("Password1!");
    expect(confirmPasswordInput).toHaveValue("Password1!");
  });

  it("Collects userregistrationform and sends them as a JSON", async () => {
    vi.spyOn(useSignup, "useSignup").mockReturnValue({
      mutateAsync: createUserMutation,
    } as unknown as ReturnType<typeof useSignup.useSignup>);

    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    render(<Signup />, { wrapper });

    fireEvent.change(screen.getByLabelText("Brugernavn:"), {
      target: { value: "User123" },
    });
    fireEvent.change(screen.getByLabelText("Email:"), {
      target: { value: "User123@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Kodeord:"), {
      target: { value: "Kode123!" },
    });
    fireEvent.change(screen.getByLabelText("Gentag kodeord:"), {
      target: { value: "Kode123!" },
    });

    createUserMutation.mockResolvedValueOnce({});

    fireEvent.click(screen.getByRole("button", { name: /opret bruger/i }));

    const expected = {
      username: "User123",
      email: "User123@email.com",
      password: "Kode123!",
      confirmPassword: "Kode123!",
    };

    await waitFor(() => {
      expect(createUserMutation).toHaveBeenCalledWith(expected);
      expect(navigateMock).toHaveBeenCalledWith("/home");
    });
  });
  it("isn't allowed to submit with invalid data", async () => {
    const createUserMutation = vi.fn();
    vi.spyOn(useSignup, "useSignup").mockReturnValue({
      mutateAsync: createUserMutation,
      isLoading: false,
      isError: false,
      error: null,
    } as unknown as ReturnType<typeof useSignup.useSignup>);

    render(<Signup />, { wrapper });

    const submitButton = screen.getByRole("button", { name: /opret bruger/i });
    fireEvent.click(submitButton);

    const usernameError = await screen.findByText(
      /Oprettelse kræver et brugernavn/i
    );
    const emailError = await screen.findByText(
      /Email er påkrævet for oprettelse/i
    );
    const passwordErrors = await screen.findAllByText(
      /Kodeord er påkrævet for oprettelse/i
    );

    expect(usernameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(passwordErrors).toHaveLength(2); // password + confirmPassword
    expect(createUserMutation).not.toHaveBeenCalled();
  });
  it("should navigate to login page", () => {
    render(<Signup />, { wrapper });
    const link = screen.getByRole("link", { name: /tilbage til log ind/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
