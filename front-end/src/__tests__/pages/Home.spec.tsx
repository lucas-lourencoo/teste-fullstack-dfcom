import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { login } from "../../services/auth/login";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Home from "@/app/(home)/page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/services/auth/login", () => ({
  login: jest.fn(),
}));

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

describe("Home component", () => {
  const mockPush = jest.fn();
  const queryClient = new QueryClient();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  const renderWithQueryClient = (ui: ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  };

  it("renders the component", () => {
    renderWithQueryClient(<Home />);
    expect(screen.getByText(/Seja bem vindo!/i)).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  it("validates form input", async () => {
    renderWithQueryClient(<Home />);

    userEvent.type(screen.getByText(/Email/i), "invalid-email");
    userEvent.type(screen.getByText(/Senha/i), "short");

    fireEvent.click(screen.getByRole("button", { name: /Entrar/i }));

    expect(
      await screen.findByText(/Digite um email válido./i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/A senha deve conter no mínimo 8 caracteres/i)
    ).toBeInTheDocument();
  });

  it("handles successful login", async () => {
    const mockResponse = {
      data: { access_token: "fake-token" },
    };

    (login as jest.Mock).mockResolvedValue(mockResponse);

    renderWithQueryClient(<Home />);

    await userEvent.type(
      screen.getByTestId("email-input"),
      "test@example.com",
      { delay: 100 }
    );
    await userEvent.type(screen.getByTestId("password-input"), "validpassword");

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "validpassword",
      });
      expect(Cookies.set).toHaveBeenCalledWith("access_token", "fake-token");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("handles login failure", async () => {
    (login as jest.Mock).mockRejectedValue(null);

    renderWithQueryClient(<Home />);

    await userEvent.type(screen.getByTestId("email-input"), "test@example.com");
    await userEvent.type(screen.getByTestId("password-input"), "validpassword");

    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "validpassword",
      });
      expect(toast.error).toHaveBeenCalledWith(
        "Login não autorizado, tente novamente."
      );
    });
  });
});
