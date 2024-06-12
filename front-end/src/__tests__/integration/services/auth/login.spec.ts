import { render } from "@testing-library/react";
import { api } from "@/lib/axios";
import toast from "react-hot-toast";
import { login } from "@/services/auth/login";

jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
}));

jest.mock("@/lib/axios", () => ({
  api: {
    post: jest.fn(),
  },
}));

describe("login function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login successfully", async () => {
    const mockResponse = { data: { access_token: "mockAccessToken" } };
    (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const result = await login({
      email: "test@example.com",
      password: "password123",
    });

    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "password123",
    });

    expect(result).toEqual(mockResponse);

    expect(toast.error).not.toHaveBeenCalled();
  });

  it("should handle login failure", async () => {
    const mockError = new Error("Unauthorized");
    (api.post as jest.Mock).mockRejectedValueOnce(mockError);

    await login({ email: "test@example.com", password: "password123" });

    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "password123",
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Login não autorizado, tente novamente."
    );
  });
});
